import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Engineer } from './engineer.entity';
import { CommissionRates } from './commission_rate.entity';

@Entity('engineer_commission_rates')
export class EngineerCommissionRates {
  @PrimaryColumn({ name: 'engineer_id' })
  engineerId: number;

  @PrimaryColumn({ name: 'commission_rate_id' })
  commissionRateId: number;

  @ManyToOne(() => Engineer)
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;

  @ManyToOne(() => CommissionRates)
  @JoinColumn({ name: 'commission_rate_id' })
  commissionRate: CommissionRates;
}
