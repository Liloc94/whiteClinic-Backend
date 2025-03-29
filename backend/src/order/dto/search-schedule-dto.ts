// order.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class ScheduleInfoDto {
  @ApiProperty({ description: '주문ID' })
  order_id: number;

  @ApiProperty({ description: '기사ID' })
  engineer_id: number;

  @ApiProperty({ description: '고객ID' })
  customer_id: number;

  @ApiProperty({ description: '예약일자' })
  order_date: string;

  @ApiProperty({ description: '고객성함' })
  customer_name: string;

  @ApiProperty({ description: '고객연락처' })
  customer_phone: string;

  @ApiProperty({ description: '고객주소' })
  customer_addr: string;

  @ApiProperty({ description: '고객 특이사항' })
  customer_remark?: string;

  @ApiProperty({ description: '예약금 지불여부' })
  deposit_paid: boolean;

  @ApiProperty({ description: '예약금' })
  order_deposit: number;

  @ApiProperty({ description: '지불방식' })
  order_payment: string;

  @ApiProperty({ description: '제품 카테고리' })
  order_category: string;

  @ApiProperty({ description: '주문품목' })
  order_product: string;

  @ApiProperty({ description: '영수증' })
  order_receipt_docs: string;

  @ApiProperty({ description: '영수증 발행여부' })
  receipt_docs_issued: boolean;

  @ApiProperty({ description: '세척 금액' })
  order_total_amount: number;

  @ApiProperty({ description: '세척 대수' })
  order_count: number;

  @ApiProperty({ description: '주문 특이사항' })
  order_remark?: string;

  @ApiProperty({ description: '할인 여부' })
  order_isDiscount: boolean;

  @ApiProperty({ description: '할인율' })
  order_discount_ratio?: number;

  @ApiProperty({ description: '기사성함' })
  engineer_name: string;
}
