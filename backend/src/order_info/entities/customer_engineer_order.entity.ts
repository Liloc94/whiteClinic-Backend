// customer_engineer_order.entity.ts
import { Customer } from 'src/customer/entities/customer.entity';
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order_info.entity';
import { Engineer } from 'src/engineer/entities/engineer.entity';

@Entity('customer_engineer_order')
export class CustomerEngineerOrder {
  @PrimaryColumn()
  idx: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Engineer)
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;
}
