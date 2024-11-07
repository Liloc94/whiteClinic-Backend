import { SubmitOrderDto } from './dto/submit-order.dto';
import { OrderInfoService } from './order-info.service';
import { OrderData } from './entities/OrderData.entity';
import { Response } from 'express';
export declare class OrderInfoController {
    private readonly orderService;
    constructor(orderService: OrderInfoService);
    getAll(): Promise<SubmitOrderDto[]>;
    getOne(orderId: number): Promise<OrderData>;
    updateOne(id: number, req: SubmitOrderDto): Promise<void>;
    create(orderInfo: SubmitOrderDto): Promise<void>;
    findAll(res: Response): void;
}
