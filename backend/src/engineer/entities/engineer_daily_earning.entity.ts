// engineer_daily_earning.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Engineer } from './engineer.entity';
import { Order } from 'src/order_info/entities/order_info.entity';

@Entity('engineer_daily_earning')
export class EngineerDailyEarning {
  @PrimaryGeneratedColumn()
  idx: number;

  @ManyToOne(() => Order, (order) => order.dailyEarnings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Engineer, (engineer) => engineer.dailyEarnings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;

  @Column({ type: 'int' })
  daily_income: number;

  @Column({ type: 'varchar', length: 255 })
  date: string;
}
