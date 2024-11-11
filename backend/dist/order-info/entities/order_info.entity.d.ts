import { Customer } from 'src/customer/entities/customer.entity';
import { ProductDetail } from './product_detail.entity';
export declare class OrderInfo {
    orderId: number;
    customer: Customer;
    productDetail: ProductDetail;
    productRemark: string;
    count: number;
    discountAmount: number;
    totalAmount: number;
    remark: string;
}
