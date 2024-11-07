import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('weekdays')
export class WeekDays {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'day_name', nullable: true })
  dayName: string;
}
