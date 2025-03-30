import { DataSource } from 'typeorm';
import { IncomeType } from 'src/util/constants/types';
export declare class IncomeInfoService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    saveDailyIncome(incomeData: IncomeType): Promise<void>;
}
