import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from 'src/admin/admin.module';
import { RefreshTokenModule } from 'src/refresh_token/refresh_token.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    AdminModule,
    RefreshTokenModule,
    PassportModule,
    // register 함수 사용 시, secret에 환경변수로부터 읽어온 키값을 등록하기 전에 먼저 호출되어 오류가 발생한다 -> registerAsync 함수 사용으로 문제해결 가능
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        signOptions: { expiresIn: '5m', algorithm: 'RS256' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
