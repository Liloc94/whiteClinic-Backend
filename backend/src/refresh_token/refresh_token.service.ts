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

  async saveRefreshToken(
    admin: AdminAccount,
    refresh_token: string,
    expires_at: Date,
  ): Promise<AdminRefreshToken> {
    await this.refreshTokenRepository.delete({ refresh_token });
    const refreshToken = this.refreshTokenRepository.create({
      admin,
      refresh_token,
      expires_at,
    });
    return this.refreshTokenRepository.save({ ...refreshToken });
  }

  async findByToken(
    refresh_token: string,
  ): Promise<AdminRefreshToken | undefined> {
    const RefreshResult = this.refreshTokenRepository.findOne({
      where: { refresh_token },
      relations: ['admin'],
    });

    return RefreshResult;
  }

  async removeRefreshToken(refresh_token: string): Promise<void> {
    await this.refreshTokenRepository.delete({ refresh_token });

    await this.refreshTokenRepository.query(
      ` SELECT setval('admin_refresh_tokens_idx_seq', (SELECT MAX(idx) FROM admin_refresh_tokens));`,
    );
  }

  async removeAllRefreshToken(idx: number): Promise<void> {
    await this.refreshTokenRepository.delete({ idx });
  }

  async removeExpiredRefreshTokens(): Promise<void> {
    const now = new Date();
    await this.refreshTokenRepository.delete({ expires_at: LessThan(now) });
  }
}
