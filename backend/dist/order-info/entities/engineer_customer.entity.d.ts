import { Customer } from 'src/customer/entities/customer.entity';
import { Engineer } from 'src/engineer-info/entities/engineer.entity';
import { OrdersPay } from './orders_pay.entity';
export declare class EngineerCustomer {
    engineerCustomerId: number;
    engineer: Engineer;
    customer: Customer;
    orderPay: OrdersPay;
}
