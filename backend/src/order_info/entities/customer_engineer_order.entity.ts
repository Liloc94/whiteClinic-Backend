// customer_engineer_order.entity.ts
import { Customer } from 'src/customer/entities/customer.entity';
import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order_info.entity';
import { Engineer } from 'src/engineer/entities/engineer.entity';

@Entity('customer_engineer_order')
export class CustomerEngineerOrder {
  @PrimaryGeneratedColumn()
  idx: number;

  @ManyToOne(() => Customer, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Engineer, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;
}
