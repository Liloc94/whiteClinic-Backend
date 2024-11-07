import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { SubmitOrderDto } from './dto/submit-order.dto';
import { OrderInfoService } from './order-info.service';
import { OrderData } from './entities/OrderData.entity';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('orderInfo')
@ApiTags('주문정보 API')
export class OrderInfoController {
  constructor(private readonly orderService: OrderInfoService) {}

  @Get('getAll')
  @ApiOperation({
    summary: 'OrderInfo 테이블 전체정보 조회 API',
    description: 'OrderInfo 테이블 정보를 일괄 조회한다.',
  })
  async getAll(): Promise<SubmitOrderDto[]> {
    return this.orderService.getAll();
  }

  @Get('searchOrderBy:id')
  @ApiOperation({
    summary: 'id 기반 주문정보 조회 API',
    description: 'id 파라미터와 매치되는 주문정보를 불러온다.',
  })
  async getOne(@Param('id') orderId: number): Promise<OrderData> {
    return this.orderService.getOne(orderId);
  }

  @Put('updateOrderBy/:id')
  @ApiOperation({
    summary: 'id 기반 주문정보 수정',
    description:
      'id 파라미터와 매치되는 주문정보를 DB 에서 찾아 수정한다. !! @Body 는 id를 제외하고 요청해야 한다.',
  })
  async updateOne(
    @Param('id', ParseIntPipe) id: number, // ParseIntPipe로 숫자로 변환
    @Body() req: SubmitOrderDto, // @Body로 요청 본문을 가져옴
  ) {
    await this.orderService.update(id, req);
  }

  @Post('createOrder')
  @ApiOperation({
    summary: '주문정보 등록 API',
    description: '주문정보를 생성한다.',
  })
  @ApiCreatedResponse({
    description: '주문정보를 생성한다.',
    type: SubmitOrderDto,
  })
  async create(@Body() orderInfo: SubmitOrderDto): Promise<void> {
    return this.orderService.create(orderInfo);
  }

  // @Delete('deleteBy:id')
  // @ApiOperation({
  //   summary: 'id 기반 주문정보 삭제 API',
  //   description: 'id 파라미터와 매치되는 주문정보를 DB에서 삭제한다.',
  // })
  // async remove(@Param('id') orderId: number): Promise<void> {
  // return this.orderService.remove(orderId);
  // }

  @Get('responseObject')
  findAll(@Res() res: Response) {
    res.status(HttpStatus.OK).json([' library-specific response object test']);
  }
}
