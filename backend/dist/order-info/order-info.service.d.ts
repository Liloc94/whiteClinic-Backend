import { OrderInfo } from './entities/order_info.entity';
import { Repository } from 'typeorm';
import { SubmitOrder } from './entities/submit_order.entity';
import { SubmitOrderDto } from './dto/submit_order.dto';
export declare class OrderInfoService {
    private readonly orderDataRepository;
    private readonly submitOrderRepository;
    constructor(orderDataRepository: Repository<OrderInfo>, submitOrderRepository: Repository<SubmitOrder>);
    getAll(): Promise<OrderInfo[]>;
    getOne(orderId: number): Promise<OrderInfo>;
    update(orderId: number, updateData: SubmitOrderDto): Promise<OrderInfo>;
    create(orderInfo: SubmitOrderDto): Promise<void>;
    remove(orderId: number): Promise<void>;
}
