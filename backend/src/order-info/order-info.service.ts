import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderData } from './entities/OrderData.entity';
import { SubmitOrderDto } from './dto/submit-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderInfoService {
  constructor(
    @InjectRepository(OrderData)
    private readonly orderDataRepository: Repository<OrderData>,
  ) {}

  async getAll(): Promise<SubmitOrderDto[]> {
    return this.orderDataRepository.find();
  }

  async getOne(id: number) {
    // NOTE: 파라미터로 들어오는 값이 string 일 경우 정상적으로 인식되지 않음 !!
    // + 연산자를 붙이거나 타입변환이 이루어지도록 해야한다.
    const order = await this.orderDataRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID: ${id} not found`);
    } else {
      return order;
    }
  }

  // TODO: 차후 DB에서 ID 조회 후 내용 수정하는 SQL 문 작성 필요
  async update(id: number, updateData: SubmitOrderDto) {
    const order = await this.orderDataRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order with ID : ${id} not found`);
    } else {
      Object.assign(order, updateData);
      const result = await this.orderDataRepository.save(order);
      return result;
    }
  }

  async create(orderInfo: SubmitOrderDto) {
    await this.orderDataRepository.save({ ...orderInfo });
  }

  async remove(id: number) {
    const order = await this.orderDataRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order with ID : ${id} not found`);
    } else {
      await this.orderDataRepository.delete({ id });
    }
  }
}
