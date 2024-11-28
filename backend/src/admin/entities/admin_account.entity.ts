// admin_account.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AdminRefreshToken } from '../../refresh_token/entities/refresh_token.entity';
import { IsOptional } from 'class-validator';

@Entity('admin_account')
export class AdminAccount {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  admin_id: string;

  @Column({ type: 'varchar', length: 255 })
  admin_pw: string;

  @Column({ type: 'varchar', length: 50, default: 'admin' })
  @IsOptional()
  role?: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  token_version?: number;

  @OneToMany(() => AdminRefreshToken, (refreshToken) => refreshToken.admin)
  refreshTokens: AdminRefreshToken[];
}
