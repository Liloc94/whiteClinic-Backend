import { DataSource } from 'typeorm';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { EngineerDailyEarning } from './entities/engineer_daily_earning.entity';
import { SkillService } from 'src/skillUtil.service';
import { EngineerWeeklySalaryDto } from './dto/save-engineer-weeklyEarning.dto';
import { EngineerWeeklyDetailDto } from './dto/search-engineer-weeklyEarningIsPaid.dto';
export declare class EngineerService {
    private readonly skillService;
    private readonly dataSource;
    constructor(skillService: SkillService, dataSource: DataSource);
    createEngineerInfo(engineerData: CreateEngineerDto): Promise<void>;
    findAllEngineer(): Promise<any[]>;
    getAllSchedule(): Promise<import("./dto/search-engineer-schedule.dto").EngineerScheduleDto[]>;
    getDailySalary(id: number): Promise<EngineerDailyEarning[]>;
    saveEngineerWeeklySalary(weeklySalary: EngineerWeeklySalaryDto): Promise<void>;
    getEngineerWeeklyDetail(idDate: EngineerWeeklyDetailDto): Promise<string | {
        engineer_id: number;
        weekly: string;
        weekly_earning: number;
        is_paid: boolean;
    }>;
    findEngineerWithSkill(id: number): Promise<any[]>;
    updateEngineerInfo(id: number, updateInfo: UpdateEngineerDto): Promise<void>;
    removeEngineerInfo(id: number): Promise<void>;
}
