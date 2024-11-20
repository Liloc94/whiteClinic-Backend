import { EngineerSkill } from 'src/engineer/entities/engineer_skill.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { Engineer } from './entities/engineer.entity';
import { Skill } from './entities/skills.entity';
import { CustomerEngineerOrder } from 'src/order_info/entities/customer_engineer_order.entity';
import { EngineerDailyEarning } from './entities/engineer_daily_earning.entity';
import { SkillService } from 'src/skillUtil.service';
export declare class EngineerService {
    private readonly engineerRepository;
    private readonly skillRepository;
    private readonly engineerSkillRepository;
    private readonly orderDetailRepository;
    private readonly engineerDailyEarningRepository;
    private readonly skillService;
    private readonly dataSource;
    constructor(engineerRepository: Repository<Engineer>, skillRepository: Repository<Skill>, engineerSkillRepository: Repository<EngineerSkill>, orderDetailRepository: Repository<CustomerEngineerOrder>, engineerDailyEarningRepository: Repository<EngineerDailyEarning>, skillService: SkillService, dataSource: DataSource);
    createEngineerInfo(engineerData: CreateEngineerDto): Promise<void>;
    findAll(): Promise<any[]>;
    getAllSchedule(): Promise<import("./dto/search-engineer-schedule.dto").EngineerScheduleDto[]>;
    getDailySalary(id: any): Promise<EngineerDailyEarning[]>;
    findOne(id: number): Promise<Engineer[]>;
    updateEngineerInfo(id: number, updateInfo: UpdateEngineerDto): Promise<void>;
    removeEngineerInfo(id: number): Promise<void>;
}
