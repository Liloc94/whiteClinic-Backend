import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';

@Entity('refresh_token')
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'token', type: 'varchar', length: 100 })
  token: string;

  @CreateDateColumn({ name: 'created_at', type: 'date' })
  createdAt: Date;

  @Column({ name: 'expires_at', type: 'date' })
  expiresAt: Date;

  @ManyToOne(() => Admin, (admin) => admin.refreshTokens, {
    onDelete: 'CASCADE',
  })
  admin: Admin;
}
