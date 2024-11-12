import { OrderInfoService } from './order_info.service';
import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
export declare class OrderInfoController {
    private readonly orderInfoService;
    constructor(orderInfoService: OrderInfoService);
    create(createOrderInfoDto: CreateOrderInfoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateOrderInfoDto: UpdateOrderInfoDto): string;
    remove(id: string): string;
}
