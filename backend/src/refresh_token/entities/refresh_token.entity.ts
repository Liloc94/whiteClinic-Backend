// admin_refresh_tokens.entity.ts
import { AdminAccount } from 'src/admin/entities/admin_account.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
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

  @ManyToOne(() => AdminAccount, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  parent: AdminAccount;

  @JoinColumn({ name: 'admin_id' })
  admin: AdminAccount;
}
