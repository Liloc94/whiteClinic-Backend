// engineer.entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('engineer')
export class Engineer {
  @PrimaryColumn()
  engineer_id: number;

  @Column({ type: 'varchar', length: 255 })
  engineer_name: string;

  @Column({ type: 'varchar', length: 20 })
  engineer_phone: string;

  @Column({ type: 'varchar', length: 255 })
  engineer_addr: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  engineer_remark?: string;

  @Column({ type: 'int', default: 0 })
  engineer_commission: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  engineer_dayoff?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  engineer_holiday?: string;

  @Column({ type: 'varchar', length: 20 })
  engineer_payday: string;
}
