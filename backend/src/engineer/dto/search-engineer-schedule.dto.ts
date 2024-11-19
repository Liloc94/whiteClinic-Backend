import { ApiProperty } from '@nestjs/swagger';

export class EngineerScheduleDto {
  @ApiProperty({ description: '주문넘버' })
  order_id: number;

  @ApiProperty({ description: '기사넘버' })
  engineer_id: number;

  @ApiProperty({ description: '고객넘버' })
  customer_id: number;

  @ApiProperty({ description: '예약일자' })
  order_date: string;

  @ApiProperty({ description: '기사성함' })
  engineer_name: string;

  @ApiProperty({ description: '고객성함' })
  customer_name: string;

  @ApiProperty({ description: '고객주소' })
  customer_addr: string;

  @ApiProperty({ description: '고객연락처' })
  customer_phone: string;

  @ApiProperty({ description: '주문 카테고리 에어컨 or 세탁기' })
  order_product: string;

  @ApiProperty({ description: '주문 품목' })
  order_product_detail: string;

  @ApiProperty({ description: '주문 대수' })
  order_count: number;

  @ApiProperty({ description: '총 주문금액' })
  order_total_amount: number;

  @ApiProperty({ description: '주문 특이사항' })
  order_remarks?: string;

  @ApiProperty({ description: '고객 특이사항' })
  customer_remarks?: string;
}
