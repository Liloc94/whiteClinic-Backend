import { AdminRefreshToken } from '../../refreshToken/entities/refresh_token.entity';
export declare class AdminAccount {
    idx: number;
    admin_id: string;
    admin_pw: string;
    role?: string;
    token_version?: number;
    refreshTokens: AdminRefreshToken[];
}
