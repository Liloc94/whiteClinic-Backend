import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateOrderPayDTO {
  @ApiProperty({
    description: '고객 ID',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly customerId: number;

  @ApiProperty({
    description: '총 결제 금액',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly totalAmount: number;

  @ApiProperty({
    description: '계약금',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly depositAmount: number;

  @ApiProperty({
    description: '잔금',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly balanceAmount: number;

  @ApiProperty({
    description: '할인 금액',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  readonly discountAmount?: number;

  @ApiProperty({
    description: '계약금 결제 방식',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly depositMethodType: string;

  @ApiProperty({
    description: '잔금 결제 방식',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly balanceMethodType: string;

  @ApiProperty({
    description: '계약금 영수증',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly depositReceipt: string;

  @ApiProperty({
    description: '잔금 영수증',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly balanceReceipt: string;

  @ApiProperty({
    description: '영수증 발행 여부',
  })
  @IsBoolean()
  readonly receiptIssued: boolean;
}
