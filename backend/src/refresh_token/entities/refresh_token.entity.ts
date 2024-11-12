// admin_refresh_tokens.entity.ts
import { AdminAccount } from 'src/admin/entities/admin_account.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('admin_refresh_tokens')
export class AdminRefreshToken {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ type: 'int' })
  token_id: number;

  @Column({ type: 'varchar', length: 255 })
  refresh_token: string;

  @Column({ type: 'varchar', length: 50 })
  created_at: string;

  @Column({ type: 'varchar', length: 50 })
  expires_at: string;

  @ManyToOne(() => AdminAccount, (adminAccount) => adminAccount.refreshTokens)
  @JoinColumn({ name: 'token_id' })
  adminAccount: AdminAccount;
}
