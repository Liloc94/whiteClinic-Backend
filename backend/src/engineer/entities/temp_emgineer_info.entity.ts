import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('temp_engineer_info')
export class TempEngineer {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  engineer_name: string;

  @Column()
  engineer_phone: string;

  @Column({ nullable: true })
  engineer_addr: string;

  @Column({ nullable: true })
  engineer_remark: string;

  @Column()
  engineer_commission: number;

  @Column({ nullable: true })
  engineer_dayoff: string;

  @Column('simple-array', { nullable: true })
  engineer_holiday: string[];

  @Column()
  engineer_payday: string;
}
