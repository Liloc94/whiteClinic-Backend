import { EngineerInfoService } from '../service/engineer-info.service';
export declare class EngineerInfoController {
    private readonly engineerInfoService;
    constructor(engineerInfoService: EngineerInfoService);
    findAll(): Promise<{
        engineer: import("../entities/engineer.entity").Engineer[];
        engineerPay: import("../entities/engineer_daily_earnings.entity").EngineerDailyEarnings[];
        engineerPayDay: import("../entities/engineer_payday.entity").EngineerPayday[];
        EngineerCommissionRates: import("../entities/engineer_commission.rate.entity").EngineerCommissionRates[];
    }>;
}
