export declare class CreateOrderPayDTO {
    customerId: number;
    totalAmount: number;
    depositAmount: number;
    balanceAmount: number;
    discountAmount?: number;
    depositMethodType: string;
    balanceMethodType: string;
    depositReceipt: string;
    balanceReceipt: string;
    receiptIssued: boolean;
}
