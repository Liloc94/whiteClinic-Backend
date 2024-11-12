// admin_account.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AdminRefreshToken } from '../../refresh_token/entities/refresh_token.entity';

@Entity('admin_account')
export class AdminAccount {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ type: 'varchar', length: 50 })
  admin_id: string;

  @Column({ type: 'varchar', length: 255 })
  admin_pw: string;

  @Column({ type: 'varchar', length: 50 })
  role: string;

  @Column({ type: 'int' })
  token_version: number;

  @OneToMany(
    () => AdminRefreshToken,
    (refreshToken) => refreshToken.adminAccount,
  )
  refreshTokens: AdminRefreshToken[];
}
