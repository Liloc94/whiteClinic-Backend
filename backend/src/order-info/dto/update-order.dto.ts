import { PartialType } from '@nestjs/swagger';
import { SubmitOrderDto } from './submit_order.dto';

export class UpdateOrderDTO extends PartialType(SubmitOrderDto) {}
