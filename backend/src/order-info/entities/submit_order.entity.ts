import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('submit-order')
export class SubmitOrder {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column({ type: 'date' })
  order_date: Date;

  @Column({ length: 100, type: 'varchar' })
  customer_name: string;

  @Column({ length: 100, type: 'varchar' })
  customer_contact: string;

  @Column({ length: 255, type: 'varchar' })
  customer_addr: string;

  @Column({ length: 255, type: 'varchar', nullable: true })
  customer_remark?: string;

  @Column({ default: false, type: 'boolean' })
  isPayed: boolean;

  @Column({ type: 'int', default: 0 })
  bookingFee: number;

  @Column({
    enum: ['계좌이체', '카드결제', '숨고페이', '현금결제'],
    unique: true,
  })
  paymentType: string;

  @Column({ default: false, type: 'boolean' })
  isIssued: boolean;
}
