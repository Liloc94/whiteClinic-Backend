import { OrderInfoService } from './order_info.service';
import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
export declare class OrderInfoController {
    private readonly orderInfoService;
    constructor(orderInfoService: OrderInfoService);
    create(createOrderInfoDto: CreateOrderInfoDto): Promise<CreateOrderInfoDto>;
    findAll(): Promise<import("./dto/search-order-list.dto").OrderListDto[]>;
    findOne(id: string): Promise<import("./entities/order_info.entity").Order[]>;
    update(id: string, updateOrderInfoDto: UpdateOrderInfoDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
