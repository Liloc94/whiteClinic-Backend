import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiOperation({
    summary: '입력정보 기반 회원등록',
    description: '입력한 정보를 기반으로 회원정보를 DB에 저장한다.',
  })
  @ApiBody({ type: RegisterAuthDTO })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  async register(@Body() registerDto: RegisterAuthDTO) {
    const { adminID, adminPW, role } = registerDto;
    const admin = await this.authService.register(adminID, adminPW, role);

    return { message: '회원가입 성공', id: admin.id };
  }

  // 로그인
  @Post('login')
  @ApiOperation({
    summary: '입력한 회원정보 DB 조회 및 대조 이후 로그인',
    description:
      'DB 내에서 회원 아이디 및 패스워드 조회 이후 입력된 로그인 정보와 대조한 후에 일치하면 로그인. 이후 accessToken과 refreshToken이 발급 된다. 해당 토큰들을 사용하여 authorize 가능하다.',
  })
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({ status: 201, description: '로그인 성공' })
  async signIn(@Body() signInDto: CreateAuthDto) {
    return this.authService.signIn(signInDto.adminID, signInDto.adminPW);
  }

  // Refresh Token 사용하여 Access Token 갱신 ( 재발급 )
  @Post('refresh')
  @ApiOperation({
    summary: 'refresh token을 사용하여 access token 갱신',
    description:
      'refresh token 존재 여부를 체크하고 존재할 시에 새로운 access token 을 재발급한다.',
  })
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
  @ApiOperation({
    summary: '로그아웃 API',
    description:
      '로그아웃 실행 시 보유하고 있는 refresh token 과 access 토큰을 모두 제거한다.',
  })
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
  @ApiOperation({
    summary: '모든 유저의 일괄 로그아웃',
    description: '모든 유저의 토큰을 일괄적으로 삭제한다.',
  })
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
  @ApiOperation({
    summary: '로그인 중인 유저 프로필 정보 확인 API',
    description: '고유 아이디 및 유저 아이디와 역할을 조회 및 확인 가능',
  })
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
  @ApiOperation({
    summary:
      'token 값 존재여부 체크용 API , status code 200 반환 시 token 값 이 존재하는 것을 체크할 수 있다.',
  })
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: 'Admin data retrived successfully' })
  getAdminData() {
    return { message: 'Admin Data' };
  }

  // 임시로 API 엔드포인트 추가해서 테스트
  @Get('test-env-privateKey')
  @ApiOperation({ summary: 'env 키값 확인용' })
  testPrivateKey() {
    return {
      keyExists: !!process.env.PRIVATE_KEY,
      keyLength: process.env.PRIVATE_KEY?.length,
    };
  }
  @Get('test-env-publicKey')
  @ApiOperation({ summary: 'env 키값 확인용' })
  testPublicKey() {
    return {
      keyExists: !!process.env.PUBLIC_KEY,
      keyLength: process.env.PUBLIC_KEY?.length,
    };
  }
}
