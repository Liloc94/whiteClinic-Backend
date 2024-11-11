import { OrderInfoService } from './order-info.service';
import { OrderInfo } from './entities/order_info.entity';
import { Response } from 'express';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderInfoController {
    private readonly orderService;
    constructor(orderService: OrderInfoService);
    getAll(): Promise<OrderInfo[]>;
    getOne(orderId: number): Promise<OrderInfo>;
    updateOne(id: number, req: CreateOrderDto): Promise<OrderInfo>;
    create(orderInfo: CreateOrderDto): Promise<void>;
    remove(orderId: number): Promise<void>;
    findAll(res: Response): void;
}
