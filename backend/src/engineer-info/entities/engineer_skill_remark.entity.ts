import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Engineer } from './engineer.entity';

@Entity('engineer_skill_remark')
export class EngineerSkillRemark {
  @PrimaryGeneratedColumn({ name: 'engineer_skill_remark_id' })
  engineerSkillRemarkId: number;

  @ManyToOne(() => Engineer)
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;

  @Column({ name: 'skill_remark', type: 'varchar', length: 255 })
  skillRemark: string;
}
