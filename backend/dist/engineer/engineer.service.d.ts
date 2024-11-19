import { Repository } from 'typeorm';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { Engineer } from './entities/engineer.entity';
import { Skill } from './entities/skills.entity';
import { EngineerSkill } from './entities/engineer_skill.entity';
import { CustomerEngineerOrder } from 'src/order_info/entities/customer_engineer_order.entity';
import { EngineerDailyEarning } from './entities/engineer_daily_earning.entity';
export declare class EngineerService {
    private readonly engineerRepository;
    private readonly skillRepository;
    private readonly engineerSkillRepository;
    private readonly orderDetailRepository;
    private readonly engineerDailyEarningRepository;
    constructor(engineerRepository: Repository<Engineer>, skillRepository: Repository<Skill>, engineerSkillRepository: Repository<EngineerSkill>, orderDetailRepository: Repository<CustomerEngineerOrder>, engineerDailyEarningRepository: Repository<EngineerDailyEarning>);
    create(engineerData: CreateEngineerDto): Promise<void>;
    findAll(): Promise<any[]>;
    getAllSchedule(): Promise<import("./dto/search-engineer-schedule.dto").EngineerScheduleDto[]>;
    getDailySalary(): Promise<EngineerDailyEarning[]>;
    findOne(id: number): Promise<Engineer[]>;
    update(id: number, updateEngineerDto: UpdateEngineerDto): Promise<string>;
    remove(id: number): Promise<string>;
}
