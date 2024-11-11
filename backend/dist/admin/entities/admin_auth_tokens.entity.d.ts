import { Admin } from './admin.entity';
export declare class AdminAuthTokens {
    id: number;
    admin: Admin;
    token: string;
    createdAt: Date;
    expiresAt: Date;
}
