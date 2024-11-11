import { OrderInfo } from './entities/order_info.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderInfoService {
    private readonly orderDataRepository;
    constructor(orderDataRepository: Repository<OrderInfo>);
    getAll(): Promise<OrderInfo[]>;
    getOne(orderId: number): Promise<OrderInfo>;
    update(orderId: number, updateData: CreateOrderDto): Promise<OrderInfo>;
    create(orderInfo: CreateOrderDto): Promise<void>;
    remove(orderId: number): Promise<void>;
}
