import { Engineer } from 'src/engineer-info/entities/engineer.entity';
import { Skills } from './skills.entity';
export declare class EngineerSkill {
    engineerId: number;
    skillId: number;
    engineer: Engineer;
    skill: Skills;
}
