// skills.entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('skills')
export class Skill {
  @PrimaryColumn()
  skill_id: number;

  @Column({ type: 'varchar', length: 255 })
  skill_type: string;
}
