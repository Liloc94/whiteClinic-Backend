import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderInfoDto {
  @ApiProperty({ description: '제품 카테고리' })
  order_category: string;

  @ApiProperty({ description: '주문일자' })
  order_date: string;

  @ApiProperty({ description: '의뢰제품' })
  order_product: string;

  @ApiProperty({ description: '주문 총 금액' })
  order_total_amount: number;

  @ApiProperty({ description: '주문대수' })
  order_count: number;

  @ApiProperty({ description: '할인여부', default: false })
  order_isdiscount: boolean;

  @ApiProperty({ description: '할인율' })
  order_discount_ratio: number;

  @ApiProperty({ description: '특이사항' })
  order_remark: string;

  @ApiProperty({ description: '예약금' })
  order_deposit: number;

  @ApiProperty({ description: '예약금여부', default: false })
  deposit_payed: boolean;

  @ApiProperty({
    description: '지불방식',
    enum: ['계좌이체', '카드결제', '숨고페이', '현장현금결제'],
  })
  order_payment: string;

  @ApiProperty({
    description: '증빙서류',
    enum: ['간이영수증', '세금계산서', '현금영수증', '카드영수증', '필요없음'],
  })
  order_reciept_docs: string;

  @ApiProperty({ description: '증빙서류 발행여부', default: false })
  reciept_docs_issued: boolean;
}