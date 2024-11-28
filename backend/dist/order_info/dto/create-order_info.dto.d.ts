export declare class CreateOrderInfoDto {
    order_date: string;
    order_customer_name: string;
    order_customer_phone: string;
    order_customer_addr: string;
    order_customer_remark?: string;
    deposit_paid: boolean;
    order_deposit?: number;
    order_payment: string;
    order_receipt_docs: string;
    receipt_docs_issued: boolean;
    order_category: string;
    order_product: string;
    order_remark?: string;
    order_count: number;
    order_total_amount: number;
    order_isDiscount: boolean;
    order_discount_ratio?: number;
    order_engineer_name: string;
}
