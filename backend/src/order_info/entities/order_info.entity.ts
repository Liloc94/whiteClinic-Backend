// order.entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryColumn()
  order_id: number;

  @Column({ type: 'varchar', length: 255 })
  order_category: string;

  @Column({ type: 'varchar', length: 20 })
  order_date: string;

  @Column({ type: 'varchar', length: 255 })
  order_product: string;

  @Column({ type: 'int' })
  order_total_amount: number;

  @Column({ type: 'int', default: 0 })
  order_count: number;

  @Column({ type: 'boolean', default: false })
  order_isDiscount: boolean;

  @Column({ type: 'int', nullable: true })
  order_discount_ratio?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  order_remark?: string;

  @Column({ type: 'int', nullable: true })
  order_deposit?: number;

  @Column({ type: 'boolean', default: false })
  deposit_payed: boolean;

  @Column({ type: 'varchar', length: 20 })
  order_payment: string;

  @Column({ type: 'varchar', length: 50 })
  order_reciept_docs: string;

  @Column({ type: 'boolean', nullable: true })
  reciept_docs_issued?: boolean;
}
