import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AdminService } from 'src/admin/admin.service';
import { RefreshTokenService } from 'src/refresh_token/refresh_token.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { RefreshResponseDTO } from 'src/refresh_token/dto/refresh_response.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    console.log(
      'Private Key:',
      this.configService.get('PRIVATE_KEY')?.substring(0, 50),
    );
  }
  // auth.service.ts에서 테스트

  // 로그인 : Access Token과 Refresh Token 발급
  async signIn(
    adminID: string,
    adminPW: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.adminService.findOne(adminID);

    if (!user || !(await bcrypt.compare(adminPW, user.adminpw))) {
      throw new UnauthorizedException('인증되지 않은 사용자');
    }

    // 기존 세션 무효화
    await this.logoutAll(user.id);

    // 최신 tokenVersion 조회한 이후 포함하여 Access Token 발급
    const updateUser = await this.adminService.findOne(adminID);

    // Access Token에 들어갈 유저의 정보
    const payload = {
      sub: updateUser.id,
      username: updateUser.adminid,
      role: updateUser.role,
      tokenVersion: updateUser.tokenVersion,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '5m',
    });

    // Refresh Token 만료 시간 설정
    const refreshToken = this.generateRefreshToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshTokenService.saveRefreshToken(
      user,
      refreshToken,
      expiresAt,
    );

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  // Refresh Token 생성함수
  private generateRefreshToken(): string {
    // 랜덤한 64바이트 난수 생성후 헥사코드로 변경 뒤 반환
    return crypto.randomBytes(64).toString('hex');
  }

  // Refresh Token을 사용하여 새로운 Access Token 발급(재발급)
  async refreshAccessToken(refreshToken: string): Promise<RefreshResponseDTO> {
    const storedRefreshToken =
      await this.refreshTokenService.findByToken(refreshToken);
    if (!storedRefreshToken) {
      throw new UnauthorizedException('refresh Token does not exist');
    }

    const now = new Date();
    if (storedRefreshToken.expiresAt < now) {
      // Refresh Token 만료 시, 제거 후 exception 발생
      await this.refreshTokenService.removeRefreshToken(refreshToken);
      throw new UnauthorizedException('Refresh Token has been expired');
    }

    const user = storedRefreshToken.admin;

    // 기존 Refresh Token 제거
    await this.refreshTokenService.removeRefreshToken(refreshToken);

    // tokenVersion 증가
    await this.adminService.incrementTokenVersion(user.id);

    // 최신 tokenVersion 조회
    const updateUser = await this.adminService.findOne(user.adminid);

    // 새로운 Refresh Token 생성
    const newRefreshToken = this.generateRefreshToken();
    const newExpiresAt = new Date();
    newExpiresAt.setDate(newExpiresAt.getDate() + 7);

    // 새로운 Refresh Token 저장
    await this.refreshTokenService.saveRefreshToken(
      updateUser,
      newRefreshToken,
      newExpiresAt,
    );

    // 새로운 Access Token 생성
    const payload = {
      sub: updateUser.id,
      username: updateUser.adminid,
      role: updateUser.role,
      tokenVersion: updateUser.tokenVersion,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '5m',
    });

    return { access_token: accessToken, refresh_token: newRefreshToken };
  }

  // 로그아웃 시 Refresh token 제거
  async logout(refreshToken: string): Promise<void> {
    const storedRefreshToken =
      await this.refreshTokenService.findByToken(refreshToken);
    if (storedRefreshToken) {
      const admin = storedRefreshToken.admin;

      await this.refreshTokenService.removeRefreshToken(refreshToken);
      // tokenVersion 증가하여 기존 Access Token 무효화
      await this.adminService.incrementTokenVersion(admin.id);
    }
    // 유효하지 않은 토큰도 성공적으로 로그아웃 처리
  }

  // 전체 로그아웃
  async logoutAll(id: number): Promise<void> {
    await this.refreshTokenService.removeAllRefreshToken(id);
  }

  // 회원가입
  async register(adminID: string, adminPW: string, role: string = 'admin') {
    return this.adminService.createAdmin(adminID, adminPW, role);
  }
}
