import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateOrderPayDTO {
  @ApiProperty({
    description: '고객 ID',
  })
  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({
    description: '총 결제 금액',
  })
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({
    description: '계약금',
  })
  @IsNumber()
  @IsNotEmpty()
  depositAmount: number;

  @ApiProperty({
    description: '잔금',
  })
  @IsNumber()
  @IsNotEmpty()
  balanceAmount: number;

  @ApiProperty({
    description: '할인 금액',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  discountAmount?: number;

  @ApiProperty({
    description: '계약금 결제 방식',
  })
  @IsNumber()
  @IsNotEmpty()
  depositMethodType: string;

  @ApiProperty({
    description: '잔금 결제 방식',
  })
  @IsNumber()
  @IsNotEmpty()
  balanceMethodType: string;

  @ApiProperty({
    description: '계약금 영수증',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  depositReceipt: string;

  @ApiProperty({
    description: '잔금 영수증',
  })
  @IsNumber()
  @IsNotEmpty()
  balanceReceipt: string;

  @ApiProperty({
    description: '영수증 발행 여부',
  })
  @IsBoolean()
  receiptIssued: boolean;
}
