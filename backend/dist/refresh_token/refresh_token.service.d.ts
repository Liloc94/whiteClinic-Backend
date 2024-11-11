import { Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { RefreshToken } from './entities/refresh_token.entity';
export declare class RefreshTokenService {
    private readonly refreshTokenRepository;
    constructor(refreshTokenRepository: Repository<RefreshToken>);
    saveRefreshToken(admin: Admin, token: string, expiresAt: Date): Promise<RefreshToken>;
    findByToken(token: string): Promise<RefreshToken | undefined>;
    removeRefreshToken(token: string): Promise<void>;
    removeAllRefreshToken(id: number): Promise<void>;
    removeExpiredRefreshTokens(): Promise<void>;
}
