// engineer.entity.ts
import { IsOptional } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('engineer', { schema: 'white_clinic' })
export class Engineer {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'engineer_id',
  })
  engineer_id: number;

  @Column({ type: 'varchar', length: 255 })
  engineer_name: string;

  @Column({ type: 'varchar', length: 20 })
  engineer_phone: string;

  @Column({ type: 'varchar', length: 255 })
  engineer_addr: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  engineer_remark?: string;

  @Column({ type: 'integer' })
  engineer_commission_rate: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  engineer_dayoff?: string;

  @Column('simple-array', { nullable: true })
  @IsOptional()
  engineer_holiday?: string[];

  @Column({ type: 'varchar', length: 20 })
  engineer_payday: string;
}
