import { Repository } from 'typeorm';
import { AdminAccount } from 'src/admin/entities/admin_account.entity';
import { AdminRefreshToken } from './entities/refresh_token.entity';
export declare class RefreshTokenService {
    private readonly refreshTokenRepository;
    constructor(refreshTokenRepository: Repository<AdminRefreshToken>);
    saveRefreshToken(admin: AdminAccount, token: string, expiresAt: Date): Promise<AdminRefreshToken>;
    findByToken(refresh_token: string): Promise<AdminRefreshToken | undefined>;
    removeRefreshToken(token: string): Promise<void>;
    removeAllRefreshToken(id: number): Promise<void>;
    removeExpiredRefreshTokens(): Promise<void>;
}
