import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from 'typeorm';
import { ProductType } from './product_type.entity';
import { AirConditioner } from './air_condition.entity';
import { WashingMachine } from './washing_machine.entity';

@Entity('product_details')
@Check(`
  (product_type_id = 1 AND air_condition_id IS NOT NULL AND washing_machine_id IS NULL) OR
  (product_type_id = 2 AND washing_machine_id IS NOT NULL AND air_condition_id IS NULL)
`)
export class ProductDetail {
  @PrimaryGeneratedColumn({ name: 'product_detail_id' })
  productDetailId: number;

  @Column({ name: 'product_type_id' })
  productTypeId: number;

  @ManyToOne(() => ProductType)
  @JoinColumn({ name: 'product_type_id' })
  productType: ProductType;

  @Column({ name: 'air_condition_id', nullable: true })
  airConditionId: number | null;

  @ManyToOne(() => AirConditioner)
  @JoinColumn({ name: 'air_condition_id' })
  airCondition: AirConditioner | null;

  @Column({ name: 'washing_machine_id', nullable: true })
  washingMachineId: number | null;

  @ManyToOne(() => WashingMachine)
  @JoinColumn({ name: 'washing_machine_id' })
  washingMachine: WashingMachine | null;
}
