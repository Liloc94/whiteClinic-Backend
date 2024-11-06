import { Get, Injectable, NotFoundException } from '@nestjs/common';
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

  private orderDatas: OrderData[] = [];

  async findAll(): Promise<SubmitOrderDto[]> {
    return this.orderDataRepository.find();
  }

  @Get()
  getAll(): OrderData[] {
    return this.orderDatas;
  }

  getOne(id: number): OrderData {
    // NOTE: 파라미터로 들어오는 값이 string 일 경우 정상적으로 인식되지 않음 !!
    // + 연산자를 붙이거나 타입변환이 이루어지도록 해야한다.
    const order = this.orderDatas.find((order) => order.id === +id);
    if (!order) {
      throw new NotFoundException(`Order with ID: ${id} not found`);
    }

    return order;
  }

  // TODO: 차후 DB에서 ID 조회 후 내용 수정하는 SQL 문 작성 필요
  // update(id: number, orderInfo: SubmitOrderDto): OrderData {
  //   const order = this.orderDatas.find((order) => order.id === +id);
  //   if (!order) {
  //     throw new NotFoundException(`Order with ID : ${id} not found`);
  //   } else {
  //     this.orderDatas.push({
  //       id: this.orderDatas.length + 1,
  //       ...orderInfo,
  //     });
  //   }
  // }

  create(orderInfo: SubmitOrderDto) {
    this.orderDataRepository.create({ ...orderInfo });
  }

  remove(id: number) {
    this.getOne(id);
    this.orderDatas = this.orderDatas.filter((order) => order.id !== +id);
  }
}
