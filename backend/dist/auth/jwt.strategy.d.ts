import { Strategy } from 'passport-jwt';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/entities/admin.entity';
import { ConfigService } from '@nestjs/config';
interface JwtPayload {
    username: string;
    tokenVersion: number;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly adminService;
    private readonly config;
    constructor(adminService: AdminService, config: ConfigService);
    validate(payload: JwtPayload): Promise<Admin>;
}
export {};
