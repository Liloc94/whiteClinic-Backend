import { OrderDTO } from './order.dto';
export declare class OrderResponseDTO {
    customerId: number;
    orders: OrderDTO[];
    readonly orderPayId: number;
    readonly depositAmount: number;
    readonly balanceAmount: number;
    readonly paymentDiscountAmount?: number;
    readonly depositMethodTypeId: number;
    readonly balanceMethodTypeId: number;
    readonly depositReceiptId: number;
    readonly balanceReceiptId: number;
    readonly receiptIssued: boolean;
}
