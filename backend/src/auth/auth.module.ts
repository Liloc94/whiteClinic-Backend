import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from 'src/admin/admin.module';
import { RefreshTokenModule } from 'src/refresh_token/refresh_token.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import * as path from 'path';
import * as fs from 'fs';

@Module({
  imports: [
    AdminModule,
    RefreshTokenModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        // Load the private key (Keep this secure!)
        const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
        // Load the public key
        const publicKey = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');

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
