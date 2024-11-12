import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { OrderInfoService } from './order-info.service';
import { OrderInfo } from './entities/order_info.entity';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { SubmitOrderDto } from './dto/submit_order.dto';

@Controller('orderInfo')
@ApiTags('주문정보 API')
export class OrderInfoController {
  constructor(private readonly orderService: OrderInfoService) {}

  @Get('getAll')
  @ApiOperation({
    summary: 'OrderInfo 테이블 전체정보 조회 API',
    description: 'OrderInfo 테이블 정보를 일괄 조회한다.',
  })
  @ApiResponse({ status: 200, description: '주문정보 불러오기 성공' })
  async getAll(): Promise<OrderInfo[]> {
    return this.orderService.getAll();
  }

  @Get('searchOrderBy:id')
  @ApiOperation({
    summary: 'id 기반 주문정보 조회 API',
    description: 'id 파라미터와 매치되는 주문정보를 불러온다.',
  })
  @ApiResponse({ status: 200, description: '주문정보 불러오기 성공' })
  async getOne(@Param('id') orderId: number): Promise<OrderInfo> {
    return this.orderService.getOne(orderId);
  }

  @Put('updateOrderBy/:id')
  @ApiOperation({
    summary: 'id 기반 주문정보 수정',
    description:
      'id 파라미터와 매치되는 주문정보를 DB 에서 찾아 수정한다. !! @Body 는 id를 제외하고 요청해야 한다.',
  })
  @ApiResponse({ status: 200, description: '주문정보 불러오기 성공' })
  async updateOne(
    @Param('id', ParseIntPipe) id: number, // ParseIntPipe로 숫자로 변환
    @Body() req: SubmitOrderDto, // @Body로 요청 본문을 가져옴
  ): Promise<OrderInfo> {
    return this.orderService.update(id, req);
  }

  @Post('createOrder')
  @ApiOperation({
    summary: '주문정보 등록 API',
    description: '입력한 값을 기반으로 주문정보를 DB에 저장한다.',
  })
  @ApiCreatedResponse({
    description: 'SubmitOrderDto.json.',
    type: SubmitOrderDto,
  })
  @ApiResponse({ status: 200, description: '주문정보 불러오기 성공' })
  async create(@Body() orderInfo: SubmitOrderDto): Promise<void> {
    return this.orderService.create(orderInfo);
  }

  @Delete('deleteBy:id')
  @ApiOperation({
    summary: 'id 기반 주문정보 삭제 API',
    description: 'id 파라미터와 매치되는 주문정보를 DB에서 삭제한다.',
  })
  @ApiResponse({ status: 200, description: '주문정보 불러오기 성공' })
  async remove(@Param('id') orderId: number): Promise<void> {
    return this.orderService.remove(orderId);
  }

  @Get('responseObject')
  findAll(@Res() res: Response) {
    res.status(HttpStatus.OK).json([' library-specific response object test']);
  }
}
