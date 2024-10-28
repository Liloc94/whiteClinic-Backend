import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterAuthDTO } from './dto/register-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RefreshTokenDTO } from 'src/refresh_token/dto/refresh_token.dto';
import { JwtAuthGuard } from './guards/jwt_auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Request } from 'express';
import { Admin } from 'src/admin/entities/admin.entity';

@Controller('auth')
@ApiTags('토큰인증 API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입
  @Post('register')
  @ApiBody({ type: RegisterAuthDTO })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  async register(@Body() registerDto: RegisterAuthDTO) {
    const { adminID, adminPW, role } = registerDto;
    const admin = await this.authService.register(adminID, adminPW, role);
    return { message: '회원가입 성공', id: admin.id };
  }

  // 로그인
  @Post('login')
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({ status: 201, description: '로그인 성공' })
  async signIn(@Body() signInDto: CreateAuthDto) {
    return this.authService.signIn(signInDto.adminID, signInDto.adminPW);
  }

  // Refresh Token 사용하여 Access Token 갱신 ( 재발급 )
  @Post('refresh')
  @ApiBody({ type: RefreshTokenDTO })
  @ApiResponse({
    status: 201,
    description: 'Access Token과 Refresh Token 재발급',
    type: RefreshTokenDTO,
  })
  async refresh(@Body() refreshTokenDto: RefreshTokenDTO) {
    const { refresh_token } = refreshTokenDto;
    return this.authService.refreshAccessToken(refresh_token);
  }

  // 로그아웃
  @Post('logout')
  @ApiBody({ type: RefreshTokenDTO })
  @ApiResponse({ status: 201, description: '로그아웃 ' })
  async logout(@Body() body: RefreshTokenDTO) {
    const { refresh_token } = body;
    await this.authService.logout(refresh_token);
    return { message: '로그아웃 성공' };
  }

  // 전체 로그아웃
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('logoutAll')
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: '전체 로그아웃' })
  async logoutAll(@Req() req: Request) {
    const user = req.user as any;
    await this.authService.logoutAll(user.id);
    return { message: '전체 로그아웃 성공' };
  }

  // 프로필
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('Profile')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'User profile retrived successfully',
  })
  getProfile(@Req() req: Request) {
    const user = req.user as Admin;
    return { id: user.id, username: user.adminid, role: user.role };
  }

  // 관리자 전용
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin')
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: 'Admin data retrived successfully' })
  getAdminData() {
    return { message: 'Admin Data' };
  }
}
