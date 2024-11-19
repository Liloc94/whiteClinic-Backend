import { EngineerDailyEarning } from './engineer_daily_earning.entity';
export declare class Engineer {
    engineer_id: number;
    dailyEarnings: EngineerDailyEarning[];
    engineer_name: string;
    engineer_phone: string;
    engineer_addr: string;
    engineer_remark?: string;
    engineer_commission_rate: number;
    engineer_dayoff?: string;
    engineer_holiday?: string[];
    engineer_payday: string;
}
