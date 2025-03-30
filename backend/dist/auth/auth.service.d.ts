import { AdminService } from 'src/admin/admin.service';
import { RefreshTokenService } from 'src/refreshToken/refresh_token.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshResponseDTO } from 'src/refreshToken/dto/refresh_response.dto';
export declare class AuthService {
    private readonly adminService;
    private readonly refreshTokenService;
    private readonly jwtService;
    constructor(adminService: AdminService, refreshTokenService: RefreshTokenService, jwtService: JwtService);
    signIn(adminID: string, adminPW: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    private generateRefreshToken;
    refreshAccessToken(refreshToken: string): Promise<RefreshResponseDTO>;
    logout(refreshToken: string): Promise<void>;
    logoutAll(id: number): Promise<void>;
    register(admin_id: string, admin_pw: string, role?: string): Promise<import("../admin/entities/admin_account.entity").AdminAccount>;
}
