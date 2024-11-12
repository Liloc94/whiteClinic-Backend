import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('commissionrates')
export class CommissionRates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  rate: number;
}
