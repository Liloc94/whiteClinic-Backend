// admin_refresh_tokens.entity.ts
import { AdminAccount } from 'src/admin/entities/admin_account.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('admin_refresh_tokens')
export class AdminRefreshToken {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ type: 'varchar', length: 255 })
  refresh_token: string;

  @CreateDateColumn({ type: 'varchar', length: 50 })
  created_at: string;

  @Column({ type: 'varchar' })
  expires_at: Date | null;

  @ManyToOne(() => AdminAccount, (admin) => admin.refreshTokens)
  @JoinColumn({ name: 'parentIdx' })
  admin: AdminAccount;
}
