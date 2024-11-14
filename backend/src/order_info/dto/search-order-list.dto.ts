import { ApiProperty } from '@nestjs/swagger';

export class OrderListDto {
  @ApiProperty({ description: '예약일자' })
  order_date: string;

  @ApiProperty({ description: '고객성함' })
  customer_name: string;

  @ApiProperty({ description: '고객연락처' })
  customer_phone: string;

  @ApiProperty({ description: '고객주소' })
  customer_addr: string;

  @ApiProperty({ description: '특이사항' })
  customer_remark: string | null;

  @ApiProperty({ description: '담당 기사성함' })
  engineer_name: string;

  @ApiProperty({ description: '청소품목' })
  order_product: string;

  @ApiProperty({
    description: '결제방식',
    enum: ['계좌이체', '카드결제', '숨고페이', '현장현금결제'],
  })
  order_payment: string;

  @ApiProperty({
    description: '증빙서류',
    enum: ['간이영수증', '세금계산서', '현금영수증', '카드영수증', '필요없음'],
  })
  order_receipt_docs: string;

  @ApiProperty({ description: '발행여부' })
  receipt_docs_issued: boolean;
}
