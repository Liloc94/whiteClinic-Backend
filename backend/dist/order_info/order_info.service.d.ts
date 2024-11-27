import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
import { Order } from './entities/order_info.entity';
import { DataSource, Repository } from 'typeorm';
import { IncomeInfoService } from 'src/income.service';
export declare class OrderInfoService {
    private readonly orderInfoRepository;
    private readonly dataSource;
    private readonly incomeInfoService;
    constructor(orderInfoRepository: Repository<Order>, dataSource: DataSource, incomeInfoService: IncomeInfoService);
    create(createOrderInfoDto: CreateOrderInfoDto): Promise<{
        idx: number;
        savedOrderInfo: any;
        savedCustomer: any;
    }>;
    findOrderDetails(): Promise<import("./dto/search-order-list.dto").OrderListDto[]>;
    findWithId(id: number): Promise<Order>;
    updateOrderInfo(id: number, updateOrderInfoDto: UpdateOrderInfoDto): Promise<void>;
    remove(id: number): Promise<void>;
}
