import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WashingMachine {
  @PrimaryGeneratedColumn()
  washingMachineId: number;

  @Column({ length: 100, type: 'varchar' })
  name: string;
}
