import { ApiProperty } from '@nestjs/swagger';

export class OrderDTO {
  @ApiProperty({ description: '주문 고유번호', example: 1 })
  readonly orderId: number;

  @ApiProperty({ description: '고객 ID', example: 1 })
  readonly customerId: number;

  @ApiProperty({ description: '제품 상세 ID', example: 2 })
  readonly productDetailId: number;

  @ApiProperty({
    description: '제품 관련 특이사항',
    required: false,
  })
  readonly productRemark?: string;

  @ApiProperty({ description: '세척 대수' })
  readonly count: number;

  @ApiProperty({
    description: '할인 금액 (주문)',
    required: false,
  })
  readonly discountAmount?: number;

  @ApiProperty({ description: '총 금액' })
  readonly totalAmount: number;

  @ApiProperty({
    description: '비고',
    required: false,
  })
  readonly remark?: string;
}
