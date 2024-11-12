import { Engineer } from './engineer.entity';
import { Order } from 'src/order_info/entities/order_info.entity';
export declare class EngineerDailyEarning {
    idx: number;
    order: Order;
    engineer: Engineer;
    daily_income: number;
    date: string;
}
