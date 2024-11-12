import { Engineer } from '../entities/engineer.entity';
import { EngineerCommissionRates } from '../entities/engineer_commission.rate.entity';
import { Repository } from 'typeorm';
import { EngineerDailyEarnings } from '../entities/engineer_daily_earnings.entity';
import { EngineerPayday } from '../entities/engineer_payday.entity';
export declare class EngineerInfoService {
    private readonly EngineerRepository;
    private readonly engineerDailyearningsReopsitory;
    private readonly EngineerPayDayRepository;
    private readonly EngineerCommissionRatesRepository;
    constructor(EngineerRepository: Repository<Engineer>, engineerDailyearningsReopsitory: Repository<EngineerDailyEarnings>, EngineerPayDayRepository: Repository<EngineerPayday>, EngineerCommissionRatesRepository: Repository<EngineerCommissionRates>);
    engineer(): Promise<Engineer[]>;
    enginnerPay(): Promise<EngineerDailyEarnings[]>;
    engineerPayDay(): Promise<EngineerPayday[]>;
    private dayToName;
    engineerCommissionRates(): Promise<EngineerCommissionRates[]>;
    private RatesToFilter;
}
