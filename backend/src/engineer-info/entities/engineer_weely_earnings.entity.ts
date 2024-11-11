import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Column } from 'typeorm';
import { Engineer } from './engineer.entity';
import { Calendar } from 'src/order-info/entities/calendar.entity';

@Entity('engineer_weekly_earnings')
export class EngineerWeeklyEarnings {
  @PrimaryColumn({ name: 'engineer_id' })
  engineerId: number;

  @PrimaryColumn({ name: 'calendar_id' })
  calendarId: number;

  @Column({
    name: 'total_weekly_amount',
    type: 'decimal',
    precision: 20,
    scale: 2,
  })
  totalWeeklyAmount: number;

  @ManyToOne(() => Engineer)
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;

  @ManyToOne(() => Calendar)
  @JoinColumn({ name: 'calendar_id' })
  calendar: Calendar;
}
