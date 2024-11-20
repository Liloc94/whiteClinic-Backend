// skills.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn()
  skill_id: number;

  @Column({ type: 'varchar', length: 255 })
  skill_type: string;
}
