// engineer_skill.entity.ts
import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Engineer } from './engineer.entity';
import { Skill } from './skills.entity';

@Entity('engineer_skill')
export class EngineerSkill {
  @PrimaryColumn()
  engineer_id: number;

  @PrimaryColumn()
  skill_id: number;

  @ManyToOne(() => Engineer, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;

  @ManyToOne(() => Skill)
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;
}
