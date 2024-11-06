import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly adminService: AdminService) {
    super({
      // JWT를 요청 헤더에서 추출
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // 만료된 JWT는 허용하지 않음
      ignoreExpiration: false,

      // Private key를 Public key 경로에서 가져옴
      secretOrKey: process.env.PUBLIC_KEY,

      // RSA256 알고리즘 사용하여 JWT 검증
      algorithms: ['RS256'],
    });
  }

  // 검증된 JWT payload 를 처리하는 함수
  async validate(payload: any): Promise<Admin> {
    const user = await this.adminService.findOne(payload.username);
    if (!user) {
      throw new UnauthorizedException('unvalid token');
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      throw new UnauthorizedException('tokenVersion does not match');
    }

    return user;
  }
}
