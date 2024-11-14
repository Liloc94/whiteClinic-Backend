import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
import { Order } from './entities/order_info.entity';
import { Repository } from 'typeorm';
import { Engineer } from 'src/engineer/entities/engineer.entity';
import { Customer } from 'src/customer/entities/customer.entity';
export declare class OrderInfoService {
    private readonly orderInfoRepository;
    private readonly engineerRepository;
    private readonly customerRepository;
    constructor(orderInfoRepository: Repository<Order>, engineerRepository: Repository<Engineer>, customerRepository: Repository<Customer>);
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
        order_reciept_docs: string;
        reciept_docs_issued: boolean;
    } & Order>;
    findAll(): Promise<Order[]>;
    findWithId(id: number): Promise<Order[]>;
    update(id: number, updateOrderInfoDto: UpdateOrderInfoDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
