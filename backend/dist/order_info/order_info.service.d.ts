import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
import { Order } from './entities/order_info.entity';
import { Repository } from 'typeorm';
import { Engineer } from 'src/engineer/entities/engineer.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { CustomerEngineerOrder } from './entities/customer_engineer_order.entity';
export declare class OrderInfoService {
    private readonly orderInfoRepository;
    private readonly engineerRepository;
    private readonly customerRepository;
    private readonly OrderDetailRepository;
    constructor(orderInfoRepository: Repository<Order>, engineerRepository: Repository<Engineer>, customerRepository: Repository<Customer>, OrderDetailRepository: Repository<CustomerEngineerOrder>);
    create(createOrderInfoDto: CreateOrderInfoDto): Promise<CreateOrderInfoDto>;
    findAll(): Promise<Order[]>;
    findOrderDetails(): Promise<import("./dto/search-order-list.dto").OrderListDto[]>;
    findWithId(id: number): Promise<Order[]>;
    update(id: number, updateOrderInfoDto: UpdateOrderInfoDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
