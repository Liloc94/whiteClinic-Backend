import { OrderInfoService } from './order-info.service';
import { OrderInfo } from './entities/order_info.entity';
import { Response } from 'express';
import { SubmitOrderDto } from './dto/submit_order.dto';
export declare class OrderInfoController {
    private readonly orderService;
    constructor(orderService: OrderInfoService);
    getAll(): Promise<OrderInfo[]>;
    getOne(orderId: number): Promise<OrderInfo>;
    updateOne(id: number, req: SubmitOrderDto): Promise<OrderInfo>;
    create(orderInfo: SubmitOrderDto): Promise<void>;
    remove(orderId: number): Promise<void>;
    findAll(res: Response): void;
}
