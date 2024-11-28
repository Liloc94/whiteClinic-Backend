// customer_engineer_order.entity.ts
import { Customer } from 'src/customer/entities/customer.entity';
import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order_info.entity';
import { Engineer } from 'src/engineer/entities/engineer.entity';

/**
 * 매핑 테이블: 고객, 엔지니어, 주문 간 관계 관리
 */
@Entity('customer_engineer_order')
export class CustomerEngineerOrder {
  @PrimaryGeneratedColumn()
  idx: number; // 매핑 테이블의 고유 식별자

  /**
   * 고객(Customer)와의 관계
   * - 한 고객이 여러 주문과 매핑될 수 있음
   * - 삭제/업데이트 시 참조 관계 유지
   */
  @ManyToOne(() => Customer, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'customer_id' }) // 기본 키(id)를 참조
  customer: Customer;

  /**
   * 주문(Order)과의 관계
   * - 한 주문이 여러 고객/엔지니어와 매핑될 수 있음
   * - 삭제/업데이트 시 참조 관계 유지
   */
  @ManyToOne(() => Order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id', referencedColumnName: 'order_id' }) // 기본 키(id)를 참조
  order: Order;

  /**
   * 엔지니어(Engineer)와의 관계
   * - 한 엔지니어가 여러 주문과 매핑될 수 있음
   * - 삭제/업데이트 시 참조 관계 유지
   * - 엔지니어 없이도 매핑 가능 (nullable)
   */
  @ManyToOne(() => Engineer, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'engineer_id', referencedColumnName: 'engineer_id' }) // 기본 키(id)를 참조
  engineer: Engineer;
}
