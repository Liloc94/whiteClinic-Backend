import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('calendar')
export class Calendar {
  @PrimaryGeneratedColumn({ name: 'calendar_id' })
  calendarId: number;

  @Column({ name: 'week_start_date', type: 'date' })
  weekStartDate: Date;

  @Column({ name: 'week_end_date', type: 'date' })
  weekEndDate: Date;
}
