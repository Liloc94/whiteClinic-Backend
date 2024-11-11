import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AirConditioner {
  @PrimaryGeneratedColumn()
  airConditionId: number;

  @Column({ length: 100, type: 'varchar' })
  name: string;
}
