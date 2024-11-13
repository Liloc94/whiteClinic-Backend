import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { AdminRefreshToken } from './entities/refresh_token.entity';
import { AdminAccount } from 'src/admin/entities/admin_account.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(AdminRefreshToken)
    private readonly refreshTokenRepository: Repository<AdminRefreshToken>,
  ) {}

  // Refresh Token 저장
  async saveRefreshToken(
    admin: AdminAccount,
    refresh_token: string,
    expires_at: Date,
  ): Promise<AdminRefreshToken> {
    // 기존 Refresh Token 삭제
    await this.refreshTokenRepository.delete({ refresh_token });
    const refreshToken = this.refreshTokenRepository.create({
      admin,
      refresh_token,
      expires_at,
    });
    return this.refreshTokenRepository.save({ ...refreshToken });
  }

  // Refresh Token 검증
  async findByToken(
    refresh_token: string,
  ): Promise<AdminRefreshToken | undefined> {
    const RefreshResult = this.refreshTokenRepository.findOne({
      where: { refresh_token },
      relations: ['admin'],
    });
    console.log(
      'RefreshResult Token 검증(로그아웃) : ',
      (await RefreshResult).refresh_token,
    );
    console.log((await RefreshResult).refresh_token);
    return RefreshResult;
  }

  // Refresh Token 제거 (로그아웃)
  async removeRefreshToken(refresh_token: string): Promise<void> {
    await this.refreshTokenRepository.delete({ refresh_token });
  }

  // 특정 사용자에 대한 모든 Refresh Token 제거 ( 전체 로그아웃 )
  async removeAllRefreshToken(idx: number): Promise<void> {
    await this.refreshTokenRepository.delete({ idx });
  }

  // 만료된 Refresh Token 제거
  async removeExpiredRefreshTokens(): Promise<void> {
    const now = new Date();
    await this.refreshTokenRepository.delete({ expires_at: LessThan(now) });
  }
}
