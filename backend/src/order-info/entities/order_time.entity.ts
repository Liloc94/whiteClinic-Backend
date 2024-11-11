import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('order_time')
export class OrderTime {
  @PrimaryGeneratedColumn({ name: 'order_time_id' })
  orderTimeId: number;

  @Column({ type: 'varchar', length: 100 })
  time: string;
}
