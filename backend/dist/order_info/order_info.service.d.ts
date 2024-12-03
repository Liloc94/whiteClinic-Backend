import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
import { Order } from './entities/order_info.entity';
import { DataSource, Repository } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { IncomeInfoService } from 'src/income.service';
import { ScheduleInfoDto } from './dto/search-schedule-dto';
export declare class OrderInfoService {
    private readonly orderInfoRepository;
    private readonly dataSource;
    private readonly incomeInfoService;
    constructor(orderInfoRepository: Repository<Order>, dataSource: DataSource, incomeInfoService: IncomeInfoService);
    create(createOrderInfoDto: CreateOrderInfoDto): Promise<{
        idx: number;
        savedOrderInfo: import("src/util/constantTypes").ExtractOrderType & Order;
        savedCustomer: import("src/util/constantTypes").ExtractOrderCustomerType & Customer;
    }>;
    findOrderDetails(): Promise<import("./dto/search-order-list.dto").OrderListDto[]>;
    findWithId(id: number): Promise<ScheduleInfoDto>;
    updateOrderInfo(id: number, updateOrderInfoDto: UpdateOrderInfoDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<void>;
    private getOrderDetails;
    private updateCustomer;
    private updateOrder;
    private getEngineerByName;
    private handleScheduleInfo;
}
