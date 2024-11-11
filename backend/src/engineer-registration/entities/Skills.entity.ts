import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('skills')
export class Skills {
  @PrimaryGeneratedColumn({ name: 'skill_id' })
  skillId: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  skill: string;
}
