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

  @Get('orderDetails')
  @ApiOperation({
    summary: '모든 상세 주문 정보를 호출한다',
    description: 'DB의 모든 주문정보를 불러온다',
  })
  async findAll() {
    return await this.orderInfoService.findOrderDetails();
  }

  @Get('orders/:id')
  @ApiOperation({
    summary: '파라미터로 전달받은 id 를 기반으로 매치되는 주문정보를 호출한다.',
  })
  async findOne(@Param('id') id: string) {
    return await this.orderInfoService.findWithId(+id);
  }

  @Post('download-order-excel')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @ApiOperation({
    description: '모든 주문정보 일괄 조회후 엑셀파일로 다운로드 테스트',
    summary:
      '모든 주문정보 목록을 엑셀파일화 하여 클라이언트 측에서 바로 다운로드 받는다.',
  })
  async downloadOrderExcel(): Promise<StreamableFile> {
    console.log('GET: downloadOrderExcel controller entered');

    // 엑셀 파일 생성
    try {
      const data = await this.orderInfoService.downloadExcel();
      const stream = await this.excelService.createExcelStream(data);

      const fileName = `주문상세_${new Date().toISOString().slice(0, 10)}.xlsx`;
      const encodedFileName = encodeURIComponent(fileName);

      // options를 생성자에서 직접 전달
      return new StreamableFile(stream, {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        disposition: `attachment; filename="${encodedFileName}"`,
      });
    } catch (error) {
      throw new HttpException(
        '엑셀 파일 생성 중 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
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
