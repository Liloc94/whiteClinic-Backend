import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Engineer } from './engineer.entity';
import { WeekDays } from 'src/engineer-registration/entities/WeekDays.entity';

@Entity('engineer_payday')
export class EngineerPayday {
  @PrimaryGeneratedColumn()
  paydayId: number;

  @Column({ name: 'engineer_id' })
  engineerId: number;

  @Column({ name: 'weekday_id', nullable: true })
  weekdayId: number;

  @Column({ name: 'is_pay', type: 'boolean' })
  isPay: boolean;

  @ManyToOne(() => Engineer)
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;

  @ManyToOne(() => WeekDays)
  @JoinColumn({ name: 'weekday_id' })
  weekday: WeekDays;
}
