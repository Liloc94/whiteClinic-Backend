import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
import { Order } from './entities/order_info.entity';
import { Repository } from 'typeorm';
import { Engineer } from 'src/engineer/entities/engineer.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { CustomerEngineerOrder } from './entities/customer_engineer_order.entity';
import { OrderListDto } from './dto/search-order-list.dto';
export declare class OrderInfoService {
    private readonly orderInfoRepository;
    private readonly engineerRepository;
    private readonly customerRepository;
    private readonly OrderDetailRepository;
    constructor(orderInfoRepository: Repository<Order>, engineerRepository: Repository<Engineer>, customerRepository: Repository<Customer>, OrderDetailRepository: Repository<CustomerEngineerOrder>);
    create(createOrderInfoDto: CreateOrderInfoDto): Promise<{
        order_date: string;
        order_category: string;
        order_product: string;
        order_total_amount: number;
        order_count: number;
        order_isdiscount: boolean;
        order_discount_ratio: number;
        order_remark: string;
        order_deposit: number;
        deposit_payed: boolean;
        order_payment: string;
        order_receipt_docs: string;
        receipt_docs_issued: boolean;
    } & Order>;
    findAll(): Promise<Order[]>;
    findOrderDetails(): Promise<OrderListDto[]>;
    findWithId(id: number): Promise<Order[]>;
    update(id: number, updateOrderInfoDto: UpdateOrderInfoDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
