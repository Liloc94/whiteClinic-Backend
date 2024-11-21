import { DataSource } from 'typeorm';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { Engineer } from './entities/engineer.entity';
import { EngineerDailyEarning } from './entities/engineer_daily_earning.entity';
import { SkillService } from 'src/skillUtil.service';
import { EngineerWeeklySalaryDto } from './dto/save-engineer-weeklyEarning.dto';
import { EngineerWeeklyEarning } from './entities/engineer_weekly_earning.entity';
import { EngineerWeeklyDetailDto } from './dto/search-engineer-weeklyEarningIsPaid.dto';
export declare class EngineerService {
    private readonly skillService;
    private readonly dataSource;
    constructor(skillService: SkillService, dataSource: DataSource);
    createEngineerInfo(engineerData: CreateEngineerDto): Promise<void>;
    findAll(): Promise<any[]>;
    getAllSchedule(): Promise<import("./dto/search-engineer-schedule.dto").EngineerScheduleDto[]>;
    getDailySalary(id: number): Promise<EngineerDailyEarning[]>;
    saveEngineerWeeklySalary(weeklySalary: EngineerWeeklySalaryDto): Promise<void>;
    getEngineerWeeklyDetail(idDate: EngineerWeeklyDetailDto): Promise<EngineerWeeklyEarning[]>;
    findOne(id: number): Promise<Engineer[]>;
    updateEngineerInfo(id: number, updateInfo: UpdateEngineerDto): Promise<void>;
    removeEngineerInfo(id: number): Promise<void>;
}
