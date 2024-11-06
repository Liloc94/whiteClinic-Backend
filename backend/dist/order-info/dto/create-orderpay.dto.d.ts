export declare class CreateOrderPayDTO {
    readonly customerId: number;
    readonly totalAmount: number;
    readonly depositAmount: number;
    readonly balanceAmount: number;
    readonly discountAmount?: number;
    readonly depositMethodType: string;
    readonly balanceMethodType: string;
    readonly depositReceipt: string;
    readonly balanceReceipt: string;
    readonly receiptIssued: boolean;
}
