import { OrderTime } from 'src/order-info/entities/order_time.entity';
export declare class Customer {
    customerId: number;
    customerName: string;
    phoneNumber: string;
    location: string;
    bookingDate: Date;
    orderTime: OrderTime;
    remark: string;
}
