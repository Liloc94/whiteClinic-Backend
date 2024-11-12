import { Customer } from 'src/customer/entities/customer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductDetail } from './product_detail.entity';

@Entity('orders')
export class OrderInfo {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  orderId: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ type: 'int' })
  count: number;

  @Column({ name: 'discount_amount', type: 'decimal', precision: 20, scale: 2 })
  discountAmount: number;

  @Column({ name: 'total_amount', type: 'decimal', precision: 20, scale: 2 })
  totalAmount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  remark: string;

  @ManyToOne(() => ProductDetail)
  @JoinColumn({ name: 'product_detail_id' })
  productDetail: ProductDetail;

  @Column({
    name: 'product_remark',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  productRemark: string;
}
