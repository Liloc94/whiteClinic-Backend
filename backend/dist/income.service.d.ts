import { DataSource, Repository } from 'typeorm';
import { EngineerWeeklyEarning } from './engineer/entities/engineer_weekly_earning.entity';
import { EngineerDailyEarning } from './engineer/entities/engineer_daily_earning.entity';
export declare class IncomeInfoService {
    private readonly weeklyEarningRepository;
    private readonly dailyEarningRepository;
    private readonly dataSource;
    constructor(weeklyEarningRepository: Repository<EngineerWeeklyEarning>, dailyEarningRepository: Repository<EngineerDailyEarning>, dataSource: DataSource);
    saveDailyIncome(incomeData: any): Promise<void>;
}
