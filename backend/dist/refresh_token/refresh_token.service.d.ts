import { Repository } from 'typeorm';
import { AdminRefreshToken } from './entities/refresh_token.entity';
import { AdminAccount } from 'src/admin/entities/admin_account.entity';
export declare class RefreshTokenService {
    private readonly refreshTokenRepository;
    constructor(refreshTokenRepository: Repository<AdminRefreshToken>);
    saveRefreshToken(admin: AdminAccount, refresh_token: string, expires_at: Date): Promise<AdminRefreshToken>;
    findByToken(refresh_token: string): Promise<AdminRefreshToken | undefined>;
    removeRefreshToken(refresh_token: string): Promise<void>;
    removeAllRefreshToken(idx: number): Promise<void>;
    removeExpiredRefreshTokens(): Promise<void>;
}
