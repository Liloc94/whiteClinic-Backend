import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('engineer_weekly_earning')
export class EngineerWeeklyEarning {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ type: 'int2' })
  engineer_id: number;

  @Column({ type: 'varchar' })
  weekly: string;

  @Column({ type: 'int4' })
  weekly_earning: number;

  @Column({ type: 'boolean' })
  is_paid: boolean;
}
