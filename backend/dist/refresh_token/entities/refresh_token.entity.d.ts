import { AdminAccount } from 'src/admin/entities/admin_account.entity';
export declare class AdminRefreshToken {
    idx: number;
    token_id: number;
    refresh_token: string;
    created_at: string;
    expires_at: string;
    adminAccount: AdminAccount;
}
