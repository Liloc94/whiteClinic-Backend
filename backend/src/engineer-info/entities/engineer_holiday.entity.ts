import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Engineer } from './engineer.entity';

@Entity('holiday')
export class Holiday {
  @PrimaryGeneratedColumn({ name: 'holiday_id' })
  holidayId: number;

  @ManyToOne(() => Engineer)
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;

  @Column({ type: 'date' })
  holiday: Date;
}
