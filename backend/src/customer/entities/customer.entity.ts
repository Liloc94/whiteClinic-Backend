// customer.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ type: 'varchar', length: 100 })
  customer_name: string;

  @Column({ type: 'varchar', length: 100 })
  customer_phone: string;

  @Column({ type: 'varchar', length: 100 })
  customer_addr: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  customer_remark?: string;
}
