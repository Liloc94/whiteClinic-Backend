import { Customer } from 'src/customer/entities/customer.entity';
import { ProductDetail } from './product_detail.entity';
export declare class OrderInfo {
    orderId: number;
    customer: Customer;
    count: number;
    discountAmount: number;
    totalAmount: number;
    remark: string;
    productDetail: ProductDetail;
    productRemark: string;
}
