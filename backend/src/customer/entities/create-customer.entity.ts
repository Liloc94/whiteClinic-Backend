import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderTime } from 'src/order-info/entities/order_time.entity';

@Entity({ name: 'customer-info' })
export class CustomerData {
  @PrimaryGeneratedColumn()
  customerInfoId: number;

  @Column({ length: 100, nullable: false })
  customerName: string;

  @Column({ length: 100, unique: true })
  customerPhoneNum: number;

  @Column({ length: 100 })
  customerAddress: string;

  @Column({ nullable: false })
  customerBookingDate: Date;

  @ManyToOne(() => OrderTime, (orderTime) => orderTime.orderTimeId)
  @JoinColumn({ name: 'order-time-id' })
  orderTimeId: OrderTime[];

  @Column({ length: 255 })
  remark?: string;
}
