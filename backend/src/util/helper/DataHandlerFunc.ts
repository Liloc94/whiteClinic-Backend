import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { EngineerScheduleDto } from 'src/engineer/dto/search-engineer-schedule.dto';
import { EngineerSkill } from 'src/engineer/entities/engineer_skill.entity';
import { CreateOrderInfoDto } from 'src/order_info/dto/create-order_info.dto';
import { OrderListDto } from 'src/order_info/dto/search-order-list.dto';
import { UpdateOrderInfoDto } from 'src/order_info/dto/update-order_info.dto';
import { CustomerEngineerOrder } from 'src/order_info/entities/customer_engineer_order.entity';
import { DataSource } from 'typeorm';
import {
  ExtractedInfoReturnType,
  ExtractOrderCustomerType,
} from '../constantTypes';

export async function handleEngineerScheduleData(
  orderDetails: any[],
): Promise<EngineerScheduleDto[]> {
  const scheduleList: EngineerScheduleDto[] = orderDetails.map((detail) => {
    const { customer, engineer, order } = detail;

    return {
      order_id: order.order_id,
      engineer_id: engineer.engineer_id,
      customer_id: customer.customer_id,
      order_date: order.order_date,
      engineer_name: engineer.engineer_name,
      customer_name: customer.customer_name,
      customer_addr: customer.customer_addr,
      customer_phone: customer.customer_phone,
      order_product: order.order_category,
      order_product_detail: order.order_product,
      order_count: order.order_count,
      order_total_amount: order.order_total_amount,
      order_remarks: order.order_remark,
      customer_remarks: customer.customer_remark,
    };
  });
  return scheduleList;
}

export async function handleMappedData() {}

/**
 *
 * @param engineerWithSkill 기사 가능품목 배열
 * @returns 모든 기사정보 + 해당 기사의 가능품목 배열 반환
 */
export async function handleEngineerData(engineerWithSkill: EngineerSkill[]) {
  const engineerMap = new Map<number, any>();

  engineerWithSkill.forEach((engineerSkill) => {
    const { engineer, skill } = engineerSkill;

    // 엔지니어가 이미 map에 있다면 스킬만 추가
    if (engineerMap.has(engineer.engineer_id)) {
      engineerMap
        .get(engineer.engineer_id)
        .engineer_skills.push(skill.skill_type);
    } else {
      // 엔지니어가 처음 등장하는 경우, 엔지니어 정보와 스킬을 함께 추가
      engineerMap.set(engineer.engineer_id, {
        ...engineer,
        engineer_skills: [skill.skill_type],
      });
    }
  });
  return Array.from(engineerMap.values());
}

/**
 *
 * @param orderDetails CustomerEngineerOrder 테이블의 모든 JoinColumn 데이터
 * @returns 상세 주문정보 배열 형태로 반환
 */
export async function handleOrderDetailsData(
  orderDetails: CustomerEngineerOrder[],
): Promise<OrderListDto[]> {
  const orderList: OrderListDto[] = orderDetails.map((infos) => {
    return {
      order_id: infos.order.order_id,
      order_date: infos.order.order_date,
      customer_name: infos.customer.customer_name,
      customer_phone: infos.customer.customer_phone,
      customer_addr: infos.customer.customer_addr,
      customer_remark: infos.customer.customer_remark,
      engineer_name: infos.engineer.engineer_name,
      order_product: infos.order.order_product,
      order_payment: infos.order.order_payment,
      order_receipt_docs: infos.order.order_receipt_docs,
      receipt_docs_issued: infos.order.receipt_docs_issued,
    };
  });
  return orderList;
}

/**
 *
 * @param orderInfo 주문등록 시 입력 정보, CreateOrderInfoDto 타입
 * @returns [주문정보, 고객정보, 기사성함] 배열로 반환
 */
export async function handleCreateOrderInfo(
  orderInfo: CreateOrderInfoDto | UpdateOrderInfoDto,
): Promise<ExtractedInfoReturnType> {
  const {
    order_customer_addr,
    order_customer_name,
    order_customer_phone,
    order_customer_remark,
    order_engineer_name: engineer_name,
    ...rest
  } = orderInfo;

  const customerInfo: ExtractOrderCustomerType = {
    customer_name: order_customer_name,
    customer_phone: order_customer_phone,
    customer_addr: order_customer_addr,
    customer_remark: order_customer_remark,
  };

  const returnValue: ExtractedInfoReturnType = {
    order: rest,
    customer: customerInfo,
    engineer_name: engineer_name,
  };

  return returnValue;
}

export async function extractOrderDetail(
  dataSource: DataSource,
  targetEntity: EntityClassOrSchema,
) {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const orderDetails = await queryRunner.manager
      .createQueryBuilder(targetEntity, 'CustomerEngineerOrder')
      .leftJoinAndSelect('CustomerEngineerOrder.customer', 'customer')
      .leftJoinAndSelect('CustomerEngineerOrder.order', 'order')
      .leftJoinAndSelect('CustomerEngineerOrder.engineer', 'engineer')
      .getMany();

    // 데이터 검증
    if (!orderDetails || orderDetails.some((detail) => !detail.order)) {
      throw new NotFoundException('Some orders are missing');
    }

    await queryRunner.commitTransaction();

    return handleOrderDetailsData(orderDetails); // 트랜잭션 외부에서 데이터 처리
  } catch (error) {
    await queryRunner.rollbackTransaction();
    // console.error('트랜잭션 실패:', error);

    throw new HttpException(
      'Failed to extract order details : ' + error,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  } finally {
    if (!queryRunner.isReleased) {
      await queryRunner.release();
    }
  }
}

export async function extractScheduleDetail(
  dataSource: DataSource,
  targetEntity: EntityClassOrSchema,
) {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const orderDetails = await queryRunner.manager
      .createQueryBuilder(targetEntity, 'CustomerEngineerOrder')
      .leftJoinAndSelect('CustomerEngineerOrder.customer', 'customer')
      .leftJoinAndSelect('CustomerEngineerOrder.order', 'order')
      .leftJoinAndSelect('CustomerEngineerOrder.engineer', 'engineer')
      .getMany();

    // 데이터 검증
    if (!orderDetails || orderDetails.some((detail) => !detail.order)) {
      throw new NotFoundException('Some orders are missing');
    }

    await queryRunner.commitTransaction();

    return handleEngineerScheduleData(orderDetails);
  } catch (error) {
    await queryRunner.rollbackTransaction();
    // console.error('트랜잭션 실패:', error);

    throw new HttpException(
      'Failed to extract order details : ' + error,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
