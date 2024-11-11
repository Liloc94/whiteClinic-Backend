import { OrderTime } from 'src/order-info/entities/order_time.entity';
export declare class CustomerData {
    customerInfoId: number;
    customerName: string;
    customerPhoneNum: number;
    customerAddress: string;
    customerBookingDate: Date;
    orderTimeId: OrderTime[];
    remark?: string;
}
