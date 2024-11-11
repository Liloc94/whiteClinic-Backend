import { Customer } from 'src/customer/entities/customer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PaymentType } from './payment_type.entity';
import { ReceiptDocs } from './receipt_type.Entity';

@Entity('orders_pay')
export class OrdersPay {
  @PrimaryGeneratedColumn({ name: 'order_pay_id' })
  orderPayId: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ name: 'total_amount', type: 'decimal', precision: 20, scale: 2 })
  totalAmount: number;

  @Column({ name: 'deposit_amount', type: 'decimal', precision: 20, scale: 2 })
  depositAmount: number;

  @Column({ name: 'balance_amount', type: 'decimal', precision: 20, scale: 2 })
  balanceAmount: number;

  @Column({ name: 'discount_amount', type: 'decimal', precision: 20, scale: 2 })
  discountAmount: number;

  @ManyToOne(() => PaymentType)
  @JoinColumn({ name: 'deposit_method_type_id' })
  depositMethodType: PaymentType;

  @ManyToOne(() => PaymentType)
  @JoinColumn({ name: 'balance_method_type_id' })
  balanceMethodType: PaymentType;

  @ManyToOne(() => ReceiptDocs)
  @JoinColumn({ name: 'deposit_receipt_id' })
  depositReceipt: ReceiptDocs;

  @ManyToOne(() => ReceiptDocs)
  @JoinColumn({ name: 'balance_receipt_id' })
  balanceReceipt: ReceiptDocs;

  @Column({ name: 'receipt_issued', type: 'boolean' })
  receiptIssued: boolean;
}
