import { Repository, DataSource } from 'typeorm';
import { AdminAccount } from './entities/admin_account.entity';
export declare class AdminService {
    private readonly adminRepository;
    private readonly dataSource;
    constructor(adminRepository: Repository<AdminAccount>, dataSource: DataSource);
    createAdmin(adminid: string, adminpw: string, role?: string): Promise<AdminAccount>;
    findOne(adminid: string): Promise<AdminAccount | undefined>;
    incrementTokenVersion(token_version: number): Promise<void>;
}
