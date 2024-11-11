import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { LessThan, Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { RefreshToken } from './entities/refresh_token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  // Refresh Token 저장
  async saveRefreshToken(
    admin: Admin,
    token: string,
    expiresAt: Date,
  ): Promise<RefreshToken> {
    // 기존 Refresh Token 삭제
    await this.refreshTokenRepository.delete({ admin });
    const refreshToken = this.refreshTokenRepository.create({
      token,
      admin,
      expiresAt,
    });
    return this.refreshTokenRepository.save(refreshToken);
  }

  // Refresh Token 검증
  async findByToken(token: string): Promise<RefreshToken | undefined> {
    const RefreshResult = this.refreshTokenRepository.findOne({
      where: { token },
      relations: ['admin'],
    });
    console.log(
      'RefreshResult Token 검증(로그아웃) : ',
      (await RefreshResult).token,
    );
    console.log((await RefreshResult).admin);
    return RefreshResult;
  }

  // Refresh Token 제거 (로그아웃)
  async removeRefreshToken(token: string): Promise<void> {
    await this.refreshTokenRepository.delete({ token });
  }

  // 특정 사용자에 대한 모든 Refresh Token 제거 ( 전체 로그아웃 )
  async removeAllRefreshToken(id: number): Promise<void> {
    await this.refreshTokenRepository.delete({ admin: { id } });
  }

  // 만료된 Refresh Token 제거
  async removeExpiredRefreshTokens(): Promise<void> {
    const now = new Date();
    await this.refreshTokenRepository.delete({ expiresAt: LessThan(now) });
  }
}
