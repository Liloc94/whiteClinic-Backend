import { Customer } from './customer.entity';
import { Order } from 'src/order_info/entities/order_info.entity';
import { Engineer } from 'src/engineer/entities/engineer.entity';
export declare class CustomerEngineerOrder {
    customer: Customer[];
    order: Order[];
    engineer: Engineer[];
}
