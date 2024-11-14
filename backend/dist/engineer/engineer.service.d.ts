import { Repository } from 'typeorm';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { Engineer } from './entities/engineer.entity';
import { Skill } from './entities/skills.entity';
import { EngineerSkill } from './entities/engineer_skill.entity';
export declare class EngineerService {
    private readonly engineerRepository;
    private readonly skillRepository;
    private readonly engineerSkillRepository;
    constructor(engineerRepository: Repository<Engineer>, skillRepository: Repository<Skill>, engineerSkillRepository: Repository<EngineerSkill>);
    create(engineerData: CreateEngineerDto): Promise<void>;
    findAll(): Promise<any[]>;
    findOne(id: number): string;
    update(id: number, updateEngineerDto: UpdateEngineerDto): string;
    remove(id: number): string;
    findSkillIdsByNames(skillNames: string[]): Promise<number[]>;
}
