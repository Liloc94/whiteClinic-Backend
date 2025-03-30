import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
import { Order } from './entities/order_info.entity';
import { DataSource } from 'typeorm';
import { Engineer } from 'src/engineer/entities/engineer.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { CustomerEngineerOrder } from './entities/customer_engineer_order.entity';
import { IncomeInfoService } from 'src/income.service';
import { IncomeType } from 'src/util/constants/types';
import updateCustomer from 'src/util/helperFunctions/updateCustomer';
import updateOrder from 'src/util/helperFunctions/updateOrder';
import transformToScheduleData from 'src/util/helperFunctions/transformToScheduleData';
import getEngineerByName from 'src/util/helperFunctions/getEngineerByName';
import getOrderDetails from 'src/util/helperFunctions/getOrderDetails';
import handleCreateOrderInfo from 'src/util/helperFunctions/handleNewOrder';
import extractOrderDetail from 'src/util/helperFunctions/extractOrderDetails';

@Injectable()
export class OrderInfoService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly incomeInfoService: IncomeInfoService,
  ) {}

  /**
   * @param createOrderInfoDto CreateOrderInfoDto
   * @returns Order Details
   * @description 파라미터로 전달받은 주문 정보를 기반으로 신규 주문을 생성합니다.
   */
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
      // console.error('트랜잭션 실패, 롤백 실행', error.message);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // QueryRunner 해제
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  /**
   * @returns Order Details
   * @description 주문 정보를 추출 후 상세 주문정보를 반환합니다.
   */
  async findOrderDetails() {
    return await extractOrderDetail(this.dataSource, CustomerEngineerOrder);
  }

  /**
   * @param id Order ID
   * @returns Order Details
   * @description 파라미터 id 기반으로 주문 정보를 조회합니다.
   */
  async findWithId(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orderDetails = await queryRunner.manager
        .createQueryBuilder(CustomerEngineerOrder, 'ceo')
        .leftJoinAndSelect('ceo.customer', 'customer')
        .leftJoinAndSelect('ceo.order', 'order')
        .leftJoinAndSelect('ceo.engineer', 'engineer')
        .where({ order: id })
        .getOne();

      await queryRunner.commitTransaction();

      return await transformToScheduleData(orderDetails);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /**
   * Update Order Info
   * @param id Order ID
   * @param updateOrderInfoDto UpdateOrderInfoDto
   * @returns Updated Order Info
   * @description 파라미터 id 기반으로 주문 정보를 업데이트 합니다.
   */
  async updateOrderInfo(id: number, updateOrderInfoDto: UpdateOrderInfoDto) {
    return this.dataSource.transaction(async (queryRunner) => {
      const orderDetails = await getOrderDetails(queryRunner, id);

      if (!orderDetails) {
        throw new NotFoundException(
          `No existing record found for order ID ${id}`,
        );
      }

      const paramOrderData = await handleCreateOrderInfo(updateOrderInfoDto);

      // 1. 고객 정보 업데이트
      await updateCustomer(orderDetails.customer, paramOrderData.customer);

      // 2. 주문 정보 업데이트
      await updateOrder(orderDetails.order, paramOrderData.order);

      // 3. 엔지니어 정보 업데이트
      const engineer = await getEngineerByName(
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

  /**
   * @param id Order ID
   * @returns void
   * @description 주문 정보를 삭제합니다.
   */
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
}
