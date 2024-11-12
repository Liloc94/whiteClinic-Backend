export declare class SubmitOrderDto {
    order_id: number;
    order_date: Date;
    customer_name: string;
    customer_contact: string;
    customer_addr: string;
    customer_remark?: string;
    isPayed: boolean;
    bookingFee: number;
    paymentType: string;
    recieptDocs: string;
    isIssued: boolean;
}
