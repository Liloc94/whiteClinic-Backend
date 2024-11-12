import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh_token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRefreshToken } from './entities/refresh_token.entity';
import { AdminAccount } from 'src/admin/entities/admin_account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminAccount, AdminRefreshToken])],
  controllers: [],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService, TypeOrmModule],
})
export class RefreshTokenModule {}
