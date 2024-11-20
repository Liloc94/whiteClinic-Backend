import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
import { Order } from './entities/order_info.entity';
import { DataSource, Repository } from 'typeorm';
import { Engineer } from 'src/engineer/entities/engineer.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { CustomerEngineerOrder } from './entities/customer_engineer_order.entity';
export declare class OrderInfoService {
    private readonly orderInfoRepository;
    private readonly engineerRepository;
    private readonly customerRepository;
    private readonly OrderDetailRepository;
    private readonly dataSource;
    constructor(orderInfoRepository: Repository<Order>, engineerRepository: Repository<Engineer>, customerRepository: Repository<Customer>, OrderDetailRepository: Repository<CustomerEngineerOrder>, dataSource: DataSource);
    create(createOrderInfoDto: CreateOrderInfoDto): Promise<{
        savedOrderInfo: any;
        savedCustomer: any;
    }>;
    findAll(): Promise<Order[]>;
    findOrderDetails(): Promise<import("./dto/search-order-list.dto").OrderListDto[]>;
    findWithId(id: number): Promise<Order[]>;
    update(id: number, updateOrderInfoDto: UpdateOrderInfoDto): Promise<void>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
