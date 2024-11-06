import { OrderData } from './entities/OrderData.entity';
import { SubmitOrderDto } from './dto/submit-order.dto';
import { Repository } from 'typeorm';
export declare class OrderInfoService {
    private readonly orderDataRepository;
    constructor(orderDataRepository: Repository<OrderData>);
    private orderDatas;
    findAll(): Promise<SubmitOrderDto[]>;
    getAll(): OrderData[];
    getOne(id: number): OrderData;
    create(orderInfo: SubmitOrderDto): void;
    remove(id: number): void;
}
