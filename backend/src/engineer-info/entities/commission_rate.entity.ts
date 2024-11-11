import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('commission_rates')
export class CommissionRates {
  @PrimaryGeneratedColumn({ name: 'commission_rate_id' })
  commissionRateId: number;

  @Column({
    type: 'enum',
    enum: ['50%', '55%', '60%', '65%', '70%', '75%', '80%'],
    unique: true,
  })
  rate: string;
}
