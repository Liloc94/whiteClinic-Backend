import { OrderTime } from 'src/order-info/entities/order_time.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'customer_name', type: 'varchar', length: 100 })
  customerName: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 100, unique: true })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 100 })
  location: string;

  @Column({ name: 'booking_date', type: 'date' })
  bookingDate: Date;

  @ManyToOne(() => OrderTime)
  @JoinColumn({ name: 'order_time_id' })
  orderTime: OrderTime;

  @Column({ type: 'varchar', length: 255, nullable: true })
  remark: string;
}
