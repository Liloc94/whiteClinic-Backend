import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from 'src/admin/admin.module';
import { RefreshTokenModule } from 'src/refreshToken/refresh_token.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AdminModule,
    RefreshTokenModule,
    PassportModule,
    // register 함수 사용 시, secret에 환경변수로부터 읽어온 키값을 등록하기 전에 먼저 호출되어 오류가 발생한다 -> registerAsync 함수 사용으로 비동기 처리하여 문제해결 가능
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const privateKey = config.get<string>('PRIVATE_KEY');
        const publicKey = config.get<string>('PUBLIC_KEY');

        if (!privateKey || !publicKey) {
          throw new Error('Private or Public key is missing');
        }
        return {
          privateKey,
          publicKey,
          signOptions: { expiresIn: '5m', algorithm: 'RS256' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
