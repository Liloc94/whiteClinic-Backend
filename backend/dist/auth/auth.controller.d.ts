import { AuthService } from './auth.service';
import { RegisterAuthDTO } from './dto/register-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RefreshTokenDTO } from 'src/refreshToken/dto/refresh_token.dto';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterAuthDTO): Promise<{
        message: string;
        id: number;
    }>;
    signIn(signInDto: CreateAuthDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refresh(refreshTokenDto: RefreshTokenDTO): Promise<import("../refreshToken/dto/refresh_response.dto").RefreshResponseDTO>;
    logout(body: RefreshTokenDTO): Promise<{
        message: string;
    }>;
    logoutAll(req: Request): Promise<{
        message: string;
    }>;
    getProfile(req: Request): {
        id: number;
        username: string;
        role: string;
    };
    getAdminData(): {
        message: string;
    };
}
