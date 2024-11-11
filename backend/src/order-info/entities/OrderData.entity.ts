import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orderInfo' })
export class OrderData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  orderDate: string;

  @Column()
  customerName: string;

  @Column()
  customerPhoneNum: string;

  @Column()
  customerAddr: string;

  @Column()
  customerComments: string;

  @Column()
  customerPayment: string;

  @Column()
  customerReciept: string;

  @Column()
  checkReciept: boolean;
}

@Entity({ name: 'customerInfo' })
export class CustomerData {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ length: 100, nullable: true })
  customer_name: string;

  @Column({ length: 100, nullable: true, unique: true })
  phone_number: number;

  @Column({ length: 100, nullable: true })
  customer_address: string;

  @CreateDateColumn({ default: new Date(), nullable: true })
  booking_date: Date;

  @Column({ nullable: true })
  order_time_id: number;

  @Column({ length: 100, nullable: true })
  remark: string;
}
