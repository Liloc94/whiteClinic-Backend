import { PartialType } from '@nestjs/swagger';
import { CreateOrderPayDTO } from './create-orderpay.dto';

export class UpdateOrderPayDTO extends PartialType(CreateOrderPayDTO) {}
