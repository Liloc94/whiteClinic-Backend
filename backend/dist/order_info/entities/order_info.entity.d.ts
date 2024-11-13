import { EngineerDailyEarning } from 'src/engineer/entities/engineer_daily_earning.entity';
export declare class Order {
    order_id: number;
    engineerDailyEarnings: EngineerDailyEarning[];
    order_category: string;
    order_date: string;
    order_product: string;
    order_total_amount: number;
    order_count: number;
    order_isDiscount: boolean;
    order_discount_ratio?: number;
    order_remark?: string;
    order_deposit?: number;
    deposit_payed: boolean;
    order_payment: string;
    order_reciept_docs: string;
    reciept_docs_issued?: boolean;
}
