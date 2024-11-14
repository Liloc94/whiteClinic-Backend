import { Injectable } from '@nestjs/common';
import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order_info.entity';
import { Repository } from 'typeorm';
import { Engineer } from 'src/engineer/entities/engineer.entity';
import { Customer } from 'src/customer/entities/customer.entity';

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
  ) {}

  async create(createOrderInfoDto: CreateOrderInfoDto) {
    return await this.orderInfoRepository.save({ ...createOrderInfoDto });
  }

  async findAll() {
    return await this.orderInfoRepository.find();
  }

  async findWithId(id: number) {
    return await this.orderInfoRepository.find({ where: { order_id: id } });
  }

  update(id: number, updateOrderInfoDto: UpdateOrderInfoDto) {
    return this.orderInfoRepository.update(
      { ...updateOrderInfoDto }, // 업데이트 정보 파라미터
      { order_id: id }, // 업데이트할 타겟 컬럼
    );
  }

  async remove(id: number) {
    return await this.orderInfoRepository.delete({ order_id: id });
  }
}
