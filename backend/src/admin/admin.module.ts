import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { AdminAuthTokens } from './entities/admin_auth_tokens.entity';
import { RefreshToken } from 'src/refresh_token/entities/refresh_token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, AdminAuthTokens, RefreshToken])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService, TypeOrmModule],
})
export class AdminModule {}
