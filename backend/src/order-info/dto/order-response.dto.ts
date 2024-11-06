import { ApiProperty } from '@nestjs/swagger';
import { OrderDTO } from './order.dto';

export class OrderResponseDTO {
  @ApiProperty({ description: '고객 ID' })
  customerId: number;

  @ApiProperty({
    description: '주문 목록',
    type: [OrderDTO],
  })
  orders: OrderDTO[];

  @ApiProperty({ description: '주문 결제 고유번호' })
  readonly orderPayId: number;

  @ApiProperty({ description: '계약금', example: 50000 })
  readonly depositAmount: number;

  @ApiProperty({ description: '잔금', example: 150000 })
  readonly balanceAmount: number;

  @ApiProperty({
    description: '할인 금액 (결제)',
    required: false,
  })
  readonly paymentDiscountAmount?: number;

  @ApiProperty({ description: '계약금 결제 방식 ID' })
  readonly depositMethodTypeId: number;

  @ApiProperty({ description: '잔금 결제 방식 ID' })
  readonly balanceMethodTypeId: number;

  @ApiProperty({ description: '계약금 영수증 ID' })
  readonly depositReceiptId: number;

  @ApiProperty({ description: '잔금 영수증 ID' })
  readonly balanceReceiptId: number;

  @ApiProperty({ description: '영수증 발행 여부' })
  readonly receiptIssued: boolean;
}
