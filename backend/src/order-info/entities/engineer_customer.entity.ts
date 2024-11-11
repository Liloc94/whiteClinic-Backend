import { Customer } from 'src/customer/entities/customer.entity';
import { Engineer } from 'src/engineer-info/entities/engineer.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OrdersPay } from './orders_pay.entity';

@Entity('engineer_customer')
export class EngineerCustomer {
  @PrimaryGeneratedColumn({ name: 'engineer_customer_id' })
  engineerCustomerId: number;

  @ManyToOne(() => Engineer)
  @JoinColumn({ name: 'engineer_id' })
  engineer: Engineer;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => OrdersPay)
  @JoinColumn({ name: 'order_pay_id' })
  orderPay: OrdersPay;
}
