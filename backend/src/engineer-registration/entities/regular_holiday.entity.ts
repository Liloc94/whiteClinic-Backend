import { Engineer } from 'src/engineer-info/entities/engineer.entity';
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { WeekDays } from './weekdays.entity';

@Entity('regularholidays')
export class RegularHolidays {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'engineer_id' })
  engineerId: number;

  @Column({ name: 'weekday_id' })
  weekdayId: number;

  @JoinColumn({ name: 'enginerId' })
  engineer: Engineer;

  @JoinColumn({ name: 'weekdayId' })
  weekday: WeekDays;
}
