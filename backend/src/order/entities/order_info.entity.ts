// order.entity.ts
import { EngineerDailyEarning } from 'src/engineer/entities/engineer_daily_earning.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  @JoinColumn({ name: 'order_id' })
  order_id: number;

  @OneToMany(() => EngineerDailyEarning, (dailyEarning) => dailyEarning.order)
  dailyEarnings: EngineerDailyEarning[];

  @Column({ type: 'varchar', length: 255 })
  order_category: string;

  @Column({ type: 'varchar', length: 100 })
  order_date: string;

  @Column({ type: 'varchar', length: 255 })
  order_product: string;

  @Column({ type: 'int' })
  order_total_amount: number;

  @Column({ type: 'int', default: 0 })
  order_count: number;

  @Column({ name: 'order_isdiscount', type: 'boolean', default: false })
  order_isDiscount: boolean;

  @Column({ type: 'int', nullable: true })
  order_discount_ratio?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  order_remark?: string;

  @Column({ type: 'int', nullable: true })
  order_deposit?: number;

  @Column({ type: 'boolean', default: false })
  deposit_paid: boolean;

  @Column({ type: 'varchar', length: 20 })
  order_payment: string;

  @Column({ type: 'varchar', length: 50 })
  order_receipt_docs: string;

  @Column({ type: 'boolean', nullable: true })
  receipt_docs_issued?: boolean;
}
