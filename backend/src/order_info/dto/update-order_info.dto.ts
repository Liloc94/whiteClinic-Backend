import { PartialType } from '@nestjs/swagger';
import { CreateOrderInfoDto } from './create-order_info.dto';

export class UpdateOrderInfoDto extends PartialType(CreateOrderInfoDto, {
  // PATCH 중 Null 값 skip 옵션 -> 기존값 소실 방지
  skipNullProperties: true,
}) {}
