import { Injectable } from '@nestjs/common';
import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order_info.entity';
import { DeepPartial, Repository } from 'typeorm';
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

    @InjectRepository(CustomerEngineerOrder)
    private readonly OrderDetailRepository: Repository<CustomerEngineerOrder>,
  ) {}

  async create(createOrderInfoDto: CreateOrderInfoDto) {
    const temp = await handleCreateOrderInfo(createOrderInfoDto);

    const savedOrder: Order = await this.orderInfoRepository.save({
      ...temp[0],
    });
    const savedCustomer: Customer = await this.customerRepository.save({
      ...temp[1],
    });
    const savedEngineer: Engineer = await this.engineerRepository.findOne({
      where: { engineer_name: temp[2] },
    });

    const entityObject: DeepPartial<CustomerEngineerOrder> = {
      order: savedOrder,
      customer: savedCustomer,
      engineer: savedEngineer,
    };

    await this.OrderDetailRepository.save({ ...entityObject });

    return { savedOrder, savedCustomer };
  }

  async findAll() {
    return await this.orderInfoRepository.find();
  }

  // 상세 주문정보 리스트 반환 API
  async findOrderDetails() {
    const orderDetails = await this.OrderDetailRepository.createQueryBuilder(
      'CustomerEngineerOrder',
    )
      .leftJoinAndSelect('CustomerEngineerOrder.customer', 'customer')
      .leftJoinAndSelect('CustomerEngineerOrder.order', 'order')
      .leftJoinAndSelect('CustomerEngineerOrder.engineer', 'engineer')
      .getMany();

    return await handleOrderDetailsData(orderDetails);
  }

  async findWithId(id: number) {
    return await this.orderInfoRepository.find({ where: { order_id: id } });
  }

  async update(id: number, updateOrderInfoDto: UpdateOrderInfoDto) {
    return await this.orderInfoRepository.update(
      { ...updateOrderInfoDto }, // 업데이트 정보 파라미터
      { order_id: id }, // 업데이트할 타겟 컬럼
    );
  }

  async remove(id: number) {
    return await this.orderInfoRepository.delete({ order_id: id });
  }
}
