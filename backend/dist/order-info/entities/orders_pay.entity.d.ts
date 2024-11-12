import { Customer } from 'src/customer/entities/customer.entity';
import { PaymentType } from './payment_type.entity';
import { ReceiptDocs } from './receipt_type.Entity';
export declare class OrdersPay {
    orderPayId: number;
    customer: Customer;
    totalAmount: number;
    depositAmount: number;
    balanceAmount: number;
    discountAmount: number;
    depositMethodType: PaymentType;
    balanceMethodType: PaymentType;
    depositReceipt: ReceiptDocs;
    balanceReceipt: ReceiptDocs;
    receiptIssued: boolean;
}
