import { PartialType } from '@nestjs/swagger';
import { OrderInfoDTO } from './order-info.dto';

export class UpdateOrderDTO extends PartialType(OrderInfoDTO) {}
