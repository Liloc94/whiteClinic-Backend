import { RefreshToken } from 'src/refresh_token/entities/refresh_token.entity';
export declare class Admin {
    id: number;
    admin_user_id: string;
    password: string;
    role: string;
    tokenVersion: number;
    refreshTokens: RefreshToken[];
}
