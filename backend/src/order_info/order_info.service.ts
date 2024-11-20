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
  handleCreateOrderInfo,
  handleOrderDetailsData,
} from 'src/util/DataHandlerFunc';

@Injectable()
export class OrderInfoService {
  constructor(
    // 주문정보 DB 연결
    @InjectRepository(Order)
    private readonly orderInfoRepository: Repository<Order>,
    // 기사정보 DB 연결
    @InjectRepository(Engineer)
    private readonly engineerRepository: Repository<Engineer>,
    // 고객정보 DB 연결
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    // 기사, 주문, 고객 맵핑 테이블 DB 연결
    @InjectRepository(CustomerEngineerOrder)
    private readonly OrderDetailRepository: Repository<CustomerEngineerOrder>,
    // 쿼리러너 실행용 데이터소스
    private readonly dataSource: DataSource,
  ) {}

  async create(createOrderInfoDto: CreateOrderInfoDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const temp = await handleCreateOrderInfo(createOrderInfoDto);

      // OrderInfo 저장
      const savedOrderInfo = await queryRunner.manager.save(temp[0]);

      // Customer 저장
      const savedCustomer = await queryRunner.manager.save(temp[1]);

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
      await queryRunner.manager.save(customerEngineerOrder);

      // 트랜잭션 커밋
      await queryRunner.commitTransaction();

      return { savedOrderInfo, savedCustomer };
    } catch (error) {
      // 에러 발생 시 롤백
      await queryRunner.rollbackTransaction();
      console.error('트랜잭션 실패, 롤백 실행', error.message);
      throw error;
    } finally {
      // QueryRunner 해제
      await queryRunner.release();
    }
  }

  async findAll() {
    try {
      return await this.orderInfoRepository.find();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  // 상세 주문정보 리스트 반환 API
  async findOrderDetails() {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const orderDetails = await queryRunner.manager
        .createQueryBuilder(CustomerEngineerOrder, 'CustomerEngineerOrder')
        .leftJoinAndSelect('CustomerEngineerOrder.customer', 'customer')
        .leftJoinAndSelect('CustomerEngineerOrder.order', 'order')
        .leftJoinAndSelect('CustomerEngineerOrder.engineer', 'engineer')
        .getMany();

      return await handleOrderDetailsData(orderDetails);
    } catch (error) {
      queryRunner.rollbackTransaction();
      console.log('트랜잭션 실패, 롤백실행');

      throw error;
    } finally {
      queryRunner.release();
    }
  }

  async findWithId(id: number) {
    try {
      return await this.orderInfoRepository.find({ where: { order_id: id } });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: number, updateOrderInfoDto: UpdateOrderInfoDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(
        Order,
        { ...updateOrderInfoDto }, // 업데이트 정보 파라미터
        { order_id: id }, // 업데이트할 타겟 컬럼
      );
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw error;
    } finally {
      queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    try {
      return await queryRunner.manager.delete(Order, { order_id: id });
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw error;
    } finally {
      queryRunner.release();
    }
  }
}
