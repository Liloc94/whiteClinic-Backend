import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateOrderDTO {
  @ApiProperty({
    description: '고객 ID',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly customerId: number;

  @ApiProperty({
    description: '세척 품목 ID',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly productDetailId: number;

  @ApiProperty({
    description: '제품 관련 특이사항',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly productRemark?: string;

  @ApiProperty({
    description: '세척 대수',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly count: number;

  @ApiProperty({
    description: '할인 금액',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  readonly discountAmount?: number;

  @ApiProperty({
    description: '총 금액',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly totalAmount: number;

  @ApiProperty({
    description: '비고',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly remark?: string;
}
