import { EngineerService } from './engineer.service';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
export declare class EngineerController {
    private readonly engineerService;
    constructor(engineerService: EngineerService);
    create(createEngineerDto: CreateEngineerDto): Promise<void>;
    findAll(): Promise<any[]>;
    getAllSchedule(): Promise<import("./dto/search-engineer-schedule.dto").EngineerScheduleDto[]>;
    getEngineerSalary(): Promise<import("./entities/engineer_daily_earning.entity").EngineerDailyEarning[]>;
    findOne(id: string): Promise<import("./entities/engineer.entity").Engineer[]>;
    update(id: string, updateEngineerDto: UpdateEngineerDto): Promise<string>;
    remove(id: string): Promise<string>;
}
