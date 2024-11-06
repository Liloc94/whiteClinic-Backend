import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateOrderDTO {
  @ApiProperty({
    description: '고객 ID',
  })
  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({
    description: '세척 품목 ID',
  })
  @IsNumber()
  @IsNotEmpty()
  productDetailId: number;

  @ApiProperty({
    description: '제품 관련 특이사항',
    required: false,
  })
  @IsString()
  @IsOptional()
  productRemark?: string;

  @ApiProperty({
    description: '세척 대수',
  })
  @IsNumber()
  @IsNotEmpty()
  count: number;

  @ApiProperty({
    description: '할인 금액',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  discountAmount?: number;

  @ApiProperty({
    description: '총 금액',
  })
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({
    description: '비고',
    required: false,
  })
  @IsString()
  @IsOptional()
  remark?: string;
}
