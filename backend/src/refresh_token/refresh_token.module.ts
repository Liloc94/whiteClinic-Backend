import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh_token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh_token.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { AdminAuthTokens } from 'src/admin/entities/admin_auth_tokens.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, AdminAuthTokens, RefreshToken])],
  controllers: [],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
