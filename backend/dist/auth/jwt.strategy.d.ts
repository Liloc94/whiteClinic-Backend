import { Strategy } from 'passport-jwt';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/entities/admin.entity';
interface JwtPayload {
    username: string;
    tokenVersion: number;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly adminService;
    constructor(adminService: AdminService);
    validate(payload: JwtPayload): Promise<Admin>;
}
export {};
