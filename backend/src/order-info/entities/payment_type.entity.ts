import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('payment_type')
export class PaymentType {
  @PrimaryGeneratedColumn({ name: 'payment_method_type_id' })
  paymentMethodTypeId: number;

  @Column({
    type: 'enum',
    enum: ['계좌이체', '카드결제', '숨고페이', '현금결제'],
    unique: true,
  })
  name: string;
}
