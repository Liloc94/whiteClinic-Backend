import { Repository } from 'typeorm';
import { AdminAccount } from './entities/admin_account.entity';
export declare class AdminService {
    private readonly adminRepository;
    constructor(adminRepository: Repository<AdminAccount>);
    createAdmin(adminid: string, adminpw: string, role?: string): Promise<AdminAccount>;
    findOne(adminid: string): Promise<AdminAccount | undefined>;
    incrementTokenVersion(token_version: number): Promise<void>;
}
