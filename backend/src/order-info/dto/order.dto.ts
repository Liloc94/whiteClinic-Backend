import { ApiProperty } from '@nestjs/swagger';

export class OrderDTO {
  @ApiProperty({ description: '주문 고유번호', example: 1 })
  orderId: number;

  @ApiProperty({ description: '고객 ID', example: 1 })
  customerId: number;

  @ApiProperty({ description: '제품 상세 ID', example: 2 })
  productDetailId: number;

  @ApiProperty({
    description: '제품 관련 특이사항',
    required: false,
  })
  productRemark?: string;

  @ApiProperty({ description: '세척 대수' })
  count: number;

  @ApiProperty({
    description: '할인 금액 (주문)',
    required: false,
  })
  discountAmount?: number;

  @ApiProperty({ description: '총 금액' })
  totalAmount: number;

  @ApiProperty({
    description: '비고',
    required: false,
  })
  remark?: string;
}
