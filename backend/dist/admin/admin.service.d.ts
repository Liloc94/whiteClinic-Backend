import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
export declare class AdminService {
    private readonly adminRepository;
    constructor(adminRepository: Repository<Admin>);
    createAdmin(adminid: string, adminpw: string, role?: string): Promise<Admin>;
    findOne(adminid: string): Promise<Admin | undefined>;
    incrementTokenVersion(id: number): Promise<void>;
}
