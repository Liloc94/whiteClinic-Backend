import { Customer } from 'src/customer/entities/customer.entity';
import { Order } from './order_info.entity';
import { Engineer } from 'src/engineer/entities/engineer.entity';
export declare class CustomerEngineerOrder {
    idx: number;
    customer: Customer;
    order: Order;
    engineer: Engineer;
}
