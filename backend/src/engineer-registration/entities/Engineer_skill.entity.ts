import { Engineer } from 'src/engineer-info/entities/engineer-info.entity';
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Skill } from './skill.entity';

@Entity('engineer_skill')
export class EngineerSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'engineer_id' })
  engineerId: number;

  @Column({ name: 'skill_id' })
  skillId: number;

  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;

  @JoinColumn({ name: 'skill_id' })
  skill: Skill;
}
