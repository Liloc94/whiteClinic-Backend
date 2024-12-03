export declare class ScheduleInfoDto {
    order_id: number;
    engineer_id: number;
    customer_id: number;
    order_date: string;
    customer_name: string;
    customer_phone: string;
    customer_addr: string;
    customer_remark?: string;
    deposit_paid: boolean;
    order_deposit: number;
    order_payment: string;
    order_category: string;
    order_product: string;
    order_receipt_docs: string;
    receipt_docs_issued: boolean;
    order_total_amount: number;
    order_count: number;
    order_remark?: string;
    order_isDiscount: boolean;
    order_discount_ratio?: number;
    engineer_name: string;
}
