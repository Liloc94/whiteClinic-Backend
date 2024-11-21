import { EngineerWeeklySalaryDto } from './dto/save-engineer-weeklyEarning.dto';
import { EngineerService } from './engineer.service';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { EngineerWeeklyDetailDto } from './dto/search-engineer-weeklyEarningIsPaid.dto';
export declare class EngineerController {
    private readonly engineerService;
    constructor(engineerService: EngineerService);
    create(createEngineerDto: CreateEngineerDto): Promise<void>;
    findAll(): Promise<any[]>;
    getAllSchedule(): Promise<import("./dto/search-engineer-schedule.dto").EngineerScheduleDto[]>;
    getEngineerSalary(id: number): Promise<import("./entities/engineer_daily_earning.entity").EngineerDailyEarning[]>;
    saveEngineerWeeklySalary(weeklySalary: EngineerWeeklySalaryDto): Promise<void>;
    getEngineerWeeklyDetail(idDate: EngineerWeeklyDetailDto): Promise<import("./entities/engineer_weekly_earning.entity").EngineerWeeklyEarning[]>;
    findOne(id: string): Promise<import("./entities/engineer.entity").Engineer[]>;
    update(id: string, updateEngineerDto: UpdateEngineerDto): Promise<void>;
    remove(id: string): Promise<void>;
}
