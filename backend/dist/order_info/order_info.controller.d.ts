import { OrderInfoService } from './order_info.service';
import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
export declare class OrderInfoController {
    private readonly orderInfoService;
    constructor(orderInfoService: OrderInfoService);
    create(createOrderInfoDto: CreateOrderInfoDto): Promise<{
        order_date: string;
        order_category: string;
        order_product: string;
        order_total_amount: number;
        order_count: number;
        order_isdiscount: boolean;
        order_discount_ratio: number;
        order_remark: string;
        order_deposit: number;
        deposit_payed: boolean;
        order_payment: string;
        order_reciept_docs: string;
        reciept_docs_issued: boolean;
    } & import("./entities/order_info.entity").Order>;
    findAll(): Promise<import("./entities/order_info.entity").Order[]>;
    update(id: string, updateOrderInfoDto: UpdateOrderInfoDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
