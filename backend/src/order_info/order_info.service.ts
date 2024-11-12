import { Injectable } from '@nestjs/common';
import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';

@Injectable()
export class OrderInfoService {
  create(createOrderInfoDto: CreateOrderInfoDto) {
    return 'This action adds a new orderInfo';
  }

  findAll() {
    return `This action returns all orderInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderInfo`;
  }

  update(id: number, updateOrderInfoDto: UpdateOrderInfoDto) {
    return `This action updates a #${id} orderInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderInfo`;
  }
}
