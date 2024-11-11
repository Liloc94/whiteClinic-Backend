import { RefreshToken } from 'src/refresh_token/entities/refresh_token.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('admin')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'admin_user_id', type: 'varchar', length: 100, unique: true })
  adminId: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  role: string;

  @Column({ name: 'token_version', type: 'int', nullable: true })
  tokenVersion: number | null;

  // RefreshToken과의 양방향 관계 설정
  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.admin)
  refreshTokens: RefreshToken[];
}
