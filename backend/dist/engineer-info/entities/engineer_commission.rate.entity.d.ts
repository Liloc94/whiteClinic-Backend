import { Engineer } from './engineer.entity';
import { CommissionRates } from './commission_rate.entity';
export declare class EngineerCommissionRates {
    engineerId: number;
    commissionRateId: number;
    engineer: Engineer;
    commissionRate: CommissionRates;
}
