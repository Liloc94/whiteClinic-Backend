import { IsInt, IsOptional, IsString, IsDecimal } from 'class-validator';
export class CreateOrderDto {
  @IsOptional() // Optional if we want to let the DB auto-generate
  @IsInt()
  orderId: number;

  @IsInt()
  customerId: number;

  @IsInt()
  productDetailId: number;

  @IsOptional()
  @IsString()
  productRemark: string;

  @IsInt()
  count: number;

  @IsDecimal()
  discountAmount: number;

  @IsDecimal()
  totalAmount: number;

  @IsOptional()
  @IsString()
  remark: string;
}
