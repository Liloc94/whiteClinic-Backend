import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Admin } from './admin.entity';

@Entity('admin_auth_tokens')
export class AdminAuthTokens {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Admin)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @Column({ type: 'varchar', length: 100 })
  token: string;

  @Column({ name: 'created_at', type: 'date' })
  createdAt: Date;

  @Column({ name: 'expires_at', type: 'date' })
  expiresAt: Date;
}
