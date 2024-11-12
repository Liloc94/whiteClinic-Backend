import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('weekdays')
export class WeekDays {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'day_name', nullable: true })
  dayName: string;
}
