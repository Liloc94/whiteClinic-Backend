import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Customer } from './customer.entity';
import { Order } from 'src/order_info/entities/order_info.entity';
import { Engineer } from 'src/engineer/entities/engineer.entity';

@Entity('customer_engineer_order')
export class CustomerEngineerOrder {
  @ManyToOne(() => Customer, (customer) => customer.customer_id)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer[];

  @ManyToOne(() => Order, (order) => order.order_id)
  @JoinColumn({ name: 'order_id' })
  order: Order[];

  @ManyToOne(() => Engineer, (engineer) => engineer.engineer_id)
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer[];
}
