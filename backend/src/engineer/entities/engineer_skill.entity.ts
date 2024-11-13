// engineer_skill.entity.ts
import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  ManyToMany,
} from 'typeorm';
import { Engineer } from './engineer.entity';
import { Skill } from './skills.entity';

@Entity('engineer_skill')
export class EngineerSkill {
  @PrimaryColumn()
  engineer_id: number;

  @PrimaryColumn()
  skill_id: number;

  @ManyToOne(() => Engineer)
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;

  @ManyToMany(() => Skill)
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;
}
