import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  StreamableFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrderInfoService } from './order_info.service';
import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExcelService } from 'src/makeExcel.service';

@ApiTags('주문정보 API')
@Controller('order-management')
export class OrderInfoController {
  constructor(
    private readonly orderInfoService: OrderInfoService,
    private readonly excelService: ExcelService,
  ) {}
  @Post('orders')
  @ApiOperation({
    summary: '새로운 주문정보를 DB에 저장한다.',
    description: '입력한 정보를 DB 내부 order_info 테이블에 저장한다.',
  })
  async create(@Body() createOrderInfoDto: CreateOrderInfoDto) {
    return await this.orderInfoService.create(createOrderInfoDto);
  }

  @Get('orders/')
  @ApiOperation({
    summary: '모든 상세 주문 정보를 호출한다',
    description: 'DB의 모든 주문정보를 불러온다',
  })
  async findAll() {
    return await this.orderInfoService.findOrderDetails();
  }

  @Get('orders/:id')
  @ApiOperation({
    description: '주문정보 테이블로부터 매치되는 주문정보 참조',
    summary: '파라미터로 전달받은 id 를 기반으로 매치되는 주문정보를 호출한다.',
  })
  async findOne(@Param('id') id: number) {
    return await this.orderInfoService.findWithId(id);
  }

  @Get('orders/download/excel')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @ApiOperation({
    description: '모든 주문정보 일괄 조회후 엑셀파일화 하여 다운로드',
    summary:
      '모든 주문정보 목록을 엑셀파일화 하여 클라이언트 측에서 바로 다운로드 받는다.',
  })
  async downloadOrderExcel(): Promise<StreamableFile> {
    try {
      const data = await this.orderInfoService.findOrderDetails();
      const stream = await this.excelService.createExcelStream(data);

      const fileName = `주문상세_${new Date().toISOString().slice(0, 10)}.xlsx`;
      const encodedFileName = encodeURIComponent(fileName);

      const file = new StreamableFile(stream, {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        disposition: `attachment; filename="${encodedFileName}"`,
      });

      return file;
    } catch (error) {
      throw new HttpException(
        '엑셀 파일 생성 중 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  @Patch('orders/:id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderInfoDto: UpdateOrderInfoDto,
  ) {
    return await this.orderInfoService.updateOrderInfo(id, updateOrderInfoDto);
  }

  @Delete('orders/:id')
  async remove(@Param('id') id: string) {
    return await this.orderInfoService.remove(+id);
  }
}
