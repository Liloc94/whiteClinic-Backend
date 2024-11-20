import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderInfoService } from './order_info.service';
import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('주문정보 API')
@Controller('order-info')
export class OrderInfoController {
  constructor(private readonly orderInfoService: OrderInfoService) {}

  @Post('createNewOrder')
  @ApiOperation({
    summary: '새로운 주문정보를 DB에 저장한다.',
    description: '입력한 정보를 DB 내부 order_info 테이블에 저장한다.',
  })
  async create(@Body() createOrderInfoDto: CreateOrderInfoDto) {
    return await this.orderInfoService.create(createOrderInfoDto);
  }

  @Get('getAllOrderDetails')
  @ApiOperation({
    summary: '모든 상세 주문 정보를 호출한다',
    description: 'DB의 모든 주문정보를 불러온다',
  })
  async findAll() {
    return await this.orderInfoService.findOrderDetails();
  }

  @Get('getOrder:id')
  @ApiOperation({
    summary: '파라미터로 전달받은 id 를 기반으로 매치되는 주문정보를 호출한다.',
  })
  async findOne(@Param('id') id: string) {
    return await this.orderInfoService.findWithId(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderInfoDto: UpdateOrderInfoDto,
  ) {
    return await this.orderInfoService.update(+id, updateOrderInfoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orderInfoService.remove(+id);
  }
}
