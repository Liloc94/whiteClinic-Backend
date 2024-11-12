import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Engineer } from './engineer.entity';
import { WeekDays } from 'src/engineer-registration/entities/weekdays.entity';

@Entity('EngineerDayoff')
export class EngineerDayoff {
  @PrimaryColumn({ name: 'engineer_id' })
  engineerId: number;

  @PrimaryColumn({ name: 'weekday_id' })
  weekdayId: number;

  @ManyToOne(() => Engineer)
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;

  @ManyToOne(() => WeekDays)
  @JoinColumn({ name: 'weekday_id' })
  weekday: WeekDays;
}
