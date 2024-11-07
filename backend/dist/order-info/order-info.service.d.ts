import { OrderData } from './entities/OrderData.entity';
import { SubmitOrderDto } from './dto/submit-order.dto';
import { Repository } from 'typeorm';
export declare class OrderInfoService {
    private readonly orderDataRepository;
    constructor(orderDataRepository: Repository<OrderData>);
    getAll(): Promise<SubmitOrderDto[]>;
    getOne(id: number): Promise<OrderData>;
    update(id: number, updateData: SubmitOrderDto): Promise<OrderData>;
    create(orderInfo: SubmitOrderDto): Promise<void>;
}
