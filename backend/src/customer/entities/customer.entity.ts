// customer.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn({ name: 'customer_id' })
  customer_id: number;

  @Column({ type: 'varchar', length: 100 })
  customer_name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  customer_phone: string;

  // NOTE: 주소지가 완벽하게 동일한 의뢰 등록 방지 -> unique 제거 시 해제
  @Column({ type: 'varchar', length: 255, unique: true })
  customer_addr: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  customer_remark?: string;
}
