import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order_info.entity';
import { DataSource, Repository } from 'typeorm';
import { Engineer } from 'src/engineer/entities/engineer.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { CustomerEngineerOrder } from './entities/customer_engineer_order.entity';
import {
  extractOrderDetail,
  handleCreateOrderInfo,
} from 'src/util/DataHandlerFunc';
import { IncomeInfoService } from 'src/income.service';
import { IncomeType } from 'src/util/constantTypes';

@Injectable()
export class OrderInfoService {
  constructor(
    // 주문정보 DB 연결
    @InjectRepository(Order)
    private readonly orderInfoRepository: Repository<Order>,
    // 쿼리러너 실행용 데이터소스
    private readonly dataSource: DataSource,
    // daily, weekly 매출 저장용 서비스
    private readonly incomeInfoService: IncomeInfoService,
  ) {}

  async create(createOrderInfoDto: CreateOrderInfoDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const temp = await handleCreateOrderInfo(createOrderInfoDto);
      // OrderInfo 저장
      const savedOrderInfo = await queryRunner.manager.save(Order, temp[0]);
      // Customer 저장
      const savedCustomer = await queryRunner.manager.save(Customer, temp[1]);
      // Engineer 조회
      const engineer = await queryRunner.manager.findOneByOrFail(Engineer, {
        engineer_name: temp[2],
      });
      // CustomerEngineerOrder 저장
      const customerEngineerOrder = queryRunner.manager.create(
        CustomerEngineerOrder,
        {
          customer: savedCustomer,
          order: savedOrderInfo,
          engineer: engineer,
        },
      );

      const incomes: IncomeType = {
        idx: null,
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
      console.error('트랜잭션 실패, 롤백 실행', error.message);
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
    try {
      return await this.orderInfoRepository.findOne({
        where: { order_id: id },
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async updateOrderInfo(id: number, updateOrderInfoDto: UpdateOrderInfoDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      // Order 및 Customer 관련 데이터 생성
      const temp = await handleCreateOrderInfo(updateOrderInfoDto);
      if (!temp || temp.length < 3 || temp.some((item) => !item)) {
        throw new Error('handleCreateOrderInfo returned invalid data');
      }

      // Engineer 조회: engineer_name을 기반으로 조회
      const engineer = await queryRunner.manager.findOne(Engineer, {
        where: { engineer_name: temp[2] },
      });

      // CustomerEngineerOrder 엔티티 조회 (order_id를 기준으로)
      const customerEngineerOrder = await queryRunner.manager.findOne(
        CustomerEngineerOrder,
        {
          where: { order: { order_id: id } }, // order_id로 조회
          relations: ['customer', 'order', 'engineer'],
        },
      );
    } catch (error) {
      throw error;
    }
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
}
