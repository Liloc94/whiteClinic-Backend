// engineer_daily_earning.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Engineer } from './engineer.entity';
import { Order } from 'src/order_info/entities/order_info.entity';

@Entity('engineer_daily_earning')
export class EngineerDailyEarning {
  @PrimaryColumn()
  idx: number;

  @ManyToOne(() => Order, (order) => order.order_id)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Engineer)
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;

  @Column({ type: 'int' })
  daily_income: number;

  @Column({ type: 'varchar', length: 255 })
  date: string;
}
