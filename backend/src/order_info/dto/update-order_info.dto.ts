import { PartialType } from '@nestjs/swagger';
import { CreateOrderInfoDto } from './create-order_info.dto';

export class UpdateOrderInfoDto extends PartialType(CreateOrderInfoDto) {}
