import { Engineer } from './engineer.entity';
import { Skill } from './skills.entity';
export declare class EngineerSkill {
    engineer_id: number;
    skill_id: number;
    engineer: Engineer;
    skill: Skill;
}
