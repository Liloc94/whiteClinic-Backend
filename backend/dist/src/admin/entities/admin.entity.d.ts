import { RefreshToken } from 'src/refresh_token/entities/refresh_token.entity';
export declare class Admin {
    id: number;
    adminId: string;
    password: string;
    role: string;
    tokenVersion: number | null;
    refreshTokens: RefreshToken[];
}
