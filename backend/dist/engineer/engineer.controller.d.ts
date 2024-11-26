import { EngineerWeeklySalaryDto } from './dto/save-engineer-weeklyEarning.dto';
import { EngineerService } from './engineer.service';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { EngineerWeeklyDetailDto } from './dto/search-engineer-weeklyEarningIsPaid.dto';
import { EngineerScheduleDto } from './dto/search-engineer-schedule.dto';
import { EngineerDailyEarning } from './entities/engineer_daily_earning.entity';
import { EngineerSkill } from './entities/engineer_skill.entity';
export declare class EngineerController {
    private readonly engineerService;
    constructor(engineerService: EngineerService);
    create(createEngineerDto: CreateEngineerDto): Promise<void>;
    findAll(): Promise<any[]>;
    getAllSchedule(): Promise<EngineerScheduleDto[]>;
    getEngineerSalary(id: number): Promise<EngineerDailyEarning[]>;
    saveEngineerWeeklySalary(weeklySalary: EngineerWeeklySalaryDto): Promise<void>;
    getEngineerWeeklyDetail(idDate: EngineerWeeklyDetailDto): Promise<any>;
    findOne(id: string): Promise<EngineerSkill[]>;
    update(id: number, updateEngineerDto: UpdateEngineerDto): Promise<void>;
    remove(id: string): Promise<void>;
}
