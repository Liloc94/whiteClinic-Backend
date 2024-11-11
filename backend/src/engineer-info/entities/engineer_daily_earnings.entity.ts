import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Engineer } from './engineer.entity';

@Entity('engineer_daily_earnings')
export class EngineerDailyEarnings {
  @PrimaryGeneratedColumn({ name: 'engineer_dailyearning_id' })
  engineerDailyEarningId: number;

  @ManyToOne(() => Engineer)
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;

  @Column({ type: 'date' })
  date: Date;

  @Column({ name: 'daily_amount', type: 'decimal', precision: 20, scale: 2 })
  dailyAmount: number;
}
