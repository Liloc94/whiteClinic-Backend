import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderInfo } from './entities/order_info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmitOrder } from './entities/submit_order.entity';
import { SubmitOrderDto } from './dto/submit_order.dto';

@Injectable()
export class OrderInfoService {
  constructor(
    @InjectRepository(OrderInfo)
    private readonly orderDataRepository: Repository<OrderInfo>,

    @InjectRepository(SubmitOrder)
    private readonly submitOrderRepository: Repository<SubmitOrder>,
  ) {}

  async getAll(): Promise<OrderInfo[]> {
    return this.orderDataRepository.find();
  }

  async getOne(orderId: number) {
    // NOTE: 파라미터로 들어오는 값이 string 일 경우 정상적으로 인식되지 않음 !!
    // + 연산자를 붙이거나 타입변환이 이루어지도록 해야한다.
    const order = await this.orderDataRepository.findOne({
      where: { orderId },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID: ${orderId} not found`);
    }

    return order;
  }

  // TODO: 차후 DB에서 ID 조회 후 내용 수정하는 SQL 문 작성 필요
  async update(orderId: number, updateData: SubmitOrderDto) {
    const order = await this.orderDataRepository.findOneBy({ orderId });
    if (!order) {
      throw new NotFoundException(`Order with ID : ${orderId} not found`);
    } else {
      Object.assign(order, updateData);
      const result = await this.orderDataRepository.save(order);
      return result;
    }
  }

  async create(orderInfo: SubmitOrderDto) {
    await this.submitOrderRepository.save({ ...orderInfo });
  }

  // TODO : 주문정보 임시저장 테이블로 옮기기
  async remove(orderId: number) {
    const order = await this.orderDataRepository.findOneBy({ orderId });
    if (!order) {
      throw new NotFoundException(`Order with ID : ${orderId} not found`);
    } else {
      await this.orderDataRepository.delete({ orderId });
    }
  }
}
