import { Engineer } from 'src/engineer-info/entities/engineer.entity';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Skills } from './Skills.entity';

@Entity('engineer_skill')
export class EngineerSkill {
  @PrimaryColumn({ name: 'engineer_id' })
  engineerId: number;

  @PrimaryColumn({ name: 'skill_id' })
  skillId: number;

  @ManyToOne(() => Engineer)
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;

  @ManyToOne(() => Skills)
  @JoinColumn({ name: 'skill_id' })
  skill: Skills;
}
