import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Engineer } from './engineer-info.entity';

@Entity('engineer_commissionrates')
export class EngineerCommissionRates {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'engineer_id' })
  engineerId: number;

  @Column({ name: 'rate_id' })
  rateId: number;

  @JoinColumn({ name: 'EngineerId' })
  Engineer: Engineer;
}
