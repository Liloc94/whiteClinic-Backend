import { PartialType } from '@nestjs/swagger';
import { CreateOrderInfoDto } from './create-order_info.dto';
import { IsString, ValidateIf } from 'class-validator';

export class UpdateOrderInfoDto extends PartialType(CreateOrderInfoDto, {
  // PATCH 중 Null 값 skip 옵션 -> 기존값 소실 방지
  skipNullProperties: true,
}) {
  @ValidateIf((obj) => obj.someField !== undefined)
  // undefined일 경우 검증 생략 -> 기존값 소실 방지
  @IsString()
  someField?: string;
}
