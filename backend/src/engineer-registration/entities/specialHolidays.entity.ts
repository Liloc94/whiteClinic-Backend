import { Engineer } from 'src/engineer-info/entities/engineer.entity';
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('special_holidays')
export class SpecialHolidays {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'engineer_id' })
  engineerId: number;

  @Column({ nullable: true })
  holiday: Date;

  @JoinColumn({ name: 'engineerId' })
  engineer: Engineer;
}
