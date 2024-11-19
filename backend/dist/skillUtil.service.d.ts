import { Skill } from './engineer/entities/skills.entity';
import { Repository } from 'typeorm';
export declare class SkillService {
    private readonly skillRepository;
    constructor(skillRepository: Repository<Skill>);
    findSkillIdsByNames(skillNames: string[]): Promise<number[]>;
}
