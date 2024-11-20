import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Engineer } from './engineer.entity';

@Entity('engineer_weekly_earning')
export class EngineerWeeklyEarning {
  @PrimaryGeneratedColumn()
  idx: number;

  @ManyToOne(() => Engineer, (weeklyEarning) => weeklyEarning.weeklyEarnings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;

  @Column({ type: 'varchar' })
  weekly: string;

  @Column({ type: 'int4' })
  weekly_earning: number;

  @Column({ type: 'boolean' })
  isPaid: boolean;
}
