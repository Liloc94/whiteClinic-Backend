import { Repository } from 'typeorm';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { Engineer } from './entities/engineer.entity';
import { Skill } from './entities/skills.entity';
import { EngineerSkill } from './entities/engineer_skill.entity';
import { CustomerEngineerOrder } from 'src/order_info/entities/customer_engineer_order.entity';
import { EngineerScheduleDto } from './dto/search-engineer-schedule.dto';
export declare class EngineerService {
    private readonly engineerRepository;
    private readonly skillRepository;
    private readonly engineerSkillRepository;
    private readonly orderDetailRepository;
    constructor(engineerRepository: Repository<Engineer>, skillRepository: Repository<Skill>, engineerSkillRepository: Repository<EngineerSkill>, orderDetailRepository: Repository<CustomerEngineerOrder>);
    create(engineerData: CreateEngineerDto): Promise<void>;
    findAll(): Promise<any[]>;
    getAllSchedule(): Promise<EngineerScheduleDto[]>;
    findOne(id: number): string;
    update(id: number, updateEngineerDto: UpdateEngineerDto): string;
    remove(id: number): string;
    findSkillIdsByNames(skillNames: string[]): Promise<number[]>;
}
