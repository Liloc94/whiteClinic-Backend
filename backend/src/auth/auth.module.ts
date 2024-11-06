import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from 'src/admin/admin.module';
import { RefreshTokenModule } from 'src/refresh_token/refresh_token.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AdminModule,
    RefreshTokenModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        // 환경 변수에서 키 가져오기
        const privateKey = configService
          .get<string>('PRIVATE_KEY')
          ?.replace(/\\n/g, '\n');
        const publicKey = configService
          .get<string>('PUBLIC_KEY')
          ?.replace(/\\n/g, '\n');

        if (!privateKey || !publicKey) {
          throw new Error('환경변수에 올바르지 않은 JWT Key가 존재합니다.');
        }

        // 키가 올바른 형식인지 검증
        if (
          !privateKey.includes('-----BEGIN PRIVATE KEY-----') &&
          !privateKey.includes('-----BEGIN RSA PRIVATE KEY-----')
        ) {
          throw new Error('올바르지 않은 키 포맷입니다.');
        }

        return {
          privateKey: privateKey,
          publicKey: publicKey,
          signOptions: {
            algorithm: 'RS256',
            expiresIn: '5m',
          },
          verifyOptions: { algorithms: ['RS256'] },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
