import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order_info.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Engineer } from 'src/engineer/entities/engineer.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { CustomerEngineerOrder } from './entities/customer_engineer_order.entity';
import {
  extractOrderDetail,
  handleCreateOrderInfo,
} from 'src/util/helper/DataHandlerFunc';
import { IncomeInfoService } from 'src/income.service';
import { IncomeType } from 'src/util/constantTypes';
import { ScheduleInfoDto } from './dto/search-schedule-dto';

@Injectable()
export class OrderInfoService {
  constructor(
    @InjectRepository(Order)
    private readonly orderInfoRepository: Repository<Order>,
    private readonly dataSource: DataSource,
    private readonly incomeInfoService: IncomeInfoService,
  ) {}

  async create(createOrderInfoDto: CreateOrderInfoDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const temp = await handleCreateOrderInfo(createOrderInfoDto);
      const savedOrderInfo = await queryRunner.manager.save(Order, temp.order);
      const savedCustomer = await queryRunner.manager.save(
        Customer,
        temp.customer,
      );
      const engineer = await queryRunner.manager.findOne(Engineer, {
        where: { engineer_name: temp.engineer_name },
      });
      // console.log("test");
      const customerEngineerOrder = queryRunner.manager.create(
        CustomerEngineerOrder,
        {
          customer: savedCustomer,
          order: savedOrderInfo,
          engineer: engineer,
        },
      );

      const incomes: IncomeType = {
        order_id: savedOrderInfo.order_id,
        engineer_id: engineer.engineer_id,
        daily_income: savedOrderInfo.order_total_amount,
        date: savedOrderInfo.order_date,
      };

      await queryRunner.manager.save(customerEngineerOrder);
      // 트랜잭션 커밋
      await queryRunner.commitTransaction();
      // 쿼리 실행 이후 시점의 아이디값을 참조하기 위해 commitTransaction 이후에 코드 추가
      await this.incomeInfoService.saveDailyIncome(incomes);
      // 클라이언트 데이터 업데이트 지표용 idx
      const idx = customerEngineerOrder.idx;

      return { idx, savedOrderInfo, savedCustomer };
    } catch (error) {
      // 에러 발생 시 롤백
      await queryRunner.rollbackTransaction();
      // console.error('트랜잭션 실패, 롤백 실행', error.message);
      throw error;
    } finally {
      // QueryRunner 해제
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  // 상세 주문정보 리스트 반환 API
  async findOrderDetails() {
    return await extractOrderDetail(this.dataSource, CustomerEngineerOrder);
  }

  async findWithId(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orderDetails = queryRunner.manager
        .createQueryBuilder(CustomerEngineerOrder, 'ceo')
        .leftJoinAndSelect('ceo.customer', 'customer')
        .leftJoinAndSelect('ceo.order', 'order')
        .leftJoinAndSelect('ceo.engineer', 'engineer')
        .where({ order: id })
        .getOne();

      await queryRunner.commitTransaction();

      const scheduleInfo = await this.transformToScheduleData(
        await orderDetails,
      );

      return scheduleInfo;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async updateOrderInfo(id: number, updateOrderInfoDto: UpdateOrderInfoDto) {
    return this.dataSource.transaction(async (queryRunner) => {
      const orderDetails = await this.getOrderDetails(queryRunner, id);

      if (!orderDetails) {
        throw new NotFoundException(
          `No existing record found for order ID ${id}`,
        );
      }

      const paramOrderData = await handleCreateOrderInfo(updateOrderInfoDto);

      // 1. 고객 정보 업데이트
      this.updateCustomer(orderDetails.customer, paramOrderData.customer);

      // 2. 주문 정보 업데이트
      this.updateOrder(orderDetails.order, paramOrderData.order);

      // 3. 엔지니어 정보 업데이트
      const engineer = await this.getEngineerByName(
        queryRunner,
        paramOrderData.engineer_name,
      );

      orderDetails.engineer = engineer;

      // 4. 데이터 저장
      await queryRunner.save(orderDetails.customer);
      await queryRunner.save(orderDetails.order);
      await queryRunner.save(orderDetails);

      return { message: 'Order updated successfully' };
    });
  }

  async remove(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(Order, { order_id: id });
      await queryRunner.commitTransaction();
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw error;
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  // Helper 함수 1: CustomerEngineerOrder 조회
  private async getOrderDetails(queryRunner: EntityManager, id: number) {
    return queryRunner
      .createQueryBuilder('CustomerEngineerOrder', 'ceo')
      .leftJoinAndSelect('ceo.customer', 'customer')
      .leftJoinAndSelect('ceo.order', 'order')
      .leftJoinAndSelect('ceo.engineer', 'engineer')
      .where('ceo.order_id = :id', { id })
      .getOne();
  }

  // Helper 함수 2: 고객 데이터 업데이트
  private updateCustomer(
    customer: Customer,
    updatedCustomer: Partial<Customer>,
  ) {
    customer.customer_name = updatedCustomer.customer_name;
    customer.customer_phone = updatedCustomer.customer_phone;
    customer.customer_addr = updatedCustomer.customer_addr;
    customer.customer_remark = updatedCustomer.customer_remark;
  }

  // Helper 함수 3: 주문 데이터 업데이트
  private updateOrder(order: Order, updatedOrder: Partial<Order>) {
    order.order_category = updatedOrder.order_category;
    order.order_date = updatedOrder.order_date;
    order.order_product = updatedOrder.order_product;
    order.order_total_amount = updatedOrder.order_total_amount;
    order.order_count = updatedOrder.order_count;
    order.order_isDiscount = updatedOrder.order_isDiscount;
    order.order_discount_ratio = updatedOrder.order_discount_ratio;
    order.order_remark = updatedOrder.order_remark;
    order.order_deposit = updatedOrder.order_deposit;
    order.deposit_paid = updatedOrder.deposit_paid;
    order.order_payment = updatedOrder.order_payment;
    order.order_receipt_docs = updatedOrder.order_receipt_docs;
    order.receipt_docs_issued = updatedOrder.receipt_docs_issued;
  }

  // Helper 함수 4: 엔지니어 조회
  private async getEngineerByName(queryRunner, engineerName: string) {
    const engineer = await queryRunner
      .createQueryBuilder(Engineer, 'engineer')
      .where('engineer.engineer_name = :engineerName', { engineerName })
      .getOne();

    if (!engineer) {
      throw new NotFoundException(
        `Engineer with name ${engineerName} not found`,
      );
    }

    return engineer;
  }

  private async transformToScheduleData(order: CustomerEngineerOrder) {
    const scheduleObj: ScheduleInfoDto = {
      order_id: order.order.order_id,
      engineer_id: order.engineer.engineer_id,
      customer_id: order.customer.customer_id,
      order_date: order.order.order_date,
      customer_name: order.customer.customer_name,
      customer_phone: order.customer.customer_phone,
      customer_addr: order.customer.customer_addr,
      customer_remark: order.customer.customer_remark,
      order_deposit: order.order.order_deposit,
      deposit_paid: order.order.deposit_paid,
      order_total_amount: order.order.order_total_amount,
      order_payment: order.order.order_payment,
      order_receipt_docs: order.order.order_receipt_docs,
      receipt_docs_issued: order.order.receipt_docs_issued,
      order_category: order.order.order_category,
      order_product: order.order.order_product,
      order_count: order.order.order_count,
      order_isDiscount: order.order.order_isDiscount,
      order_discount_ratio: order.order.order_discount_ratio,
      engineer_name: order.engineer.engineer_name,
    };

    return scheduleObj;
  }
}
