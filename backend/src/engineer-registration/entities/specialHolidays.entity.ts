import { Engineer } from 'src/engineer-info/entities/engineer-info.entity';
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('specialholidays')
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
