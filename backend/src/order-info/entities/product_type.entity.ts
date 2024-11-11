import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductType {
  @PrimaryGeneratedColumn()
  productTypeId: number;

  @Column({ length: 50, unique: true, type: 'varchar' })
  product: string;
}
