import { Admin } from 'src/admin/entities/admin.entity';
export declare class RefreshToken {
    id: number;
    token: string;
    createdAt: Date;
    expiresAt: Date;
    admin: Admin;
}
