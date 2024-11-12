import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { ConfigService } from '@nestjs/config';
import { AdminAccount } from 'src/admin/entities/admin_account.entity';

interface JwtPayload {
  username: string;
  tokenVersion: number;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly adminService: AdminService,
    private readonly config: ConfigService,
  ) {
    super({
      // JWT를 요청 헤더에서 추출
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // 만료된 JWT는 허용하지 않음
      ignoreExpiration: false,

      // Private key를 Public key 경로에서 가져옴
      secretOrKey: config.get<string>('PUBLIC_KEY'),

      // 알고리즘 사용하여 JWT 검증
      algorithms: ['RS256'],
    });
  }

  // 검증된 JWT payload 를 처리하는 함수
  async validate(payload: JwtPayload): Promise<AdminAccount> {
    const user = await this.adminService.findOne(payload.username);
    if (!user) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    if (user.token_version !== payload.tokenVersion) {
      throw new UnauthorizedException('토큰 버전이 맞지 않습니다.');
    }

    return user;
  }
}
