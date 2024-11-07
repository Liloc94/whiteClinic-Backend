import { RefreshToken } from 'src/refresh_token/entities/refresh_token.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  adminid: string;

  @Column()
  adminpw: string;

  @Column({ default: 'admin' })
  role: string;

  @Column({ default: 0 })
  tokenVersion: number; // Access Token 관리

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.admin)
  refreshTokens: RefreshToken[];
}
