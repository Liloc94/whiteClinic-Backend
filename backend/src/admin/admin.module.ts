import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAccount } from './entities/admin_account.entity';
import { AdminRefreshToken } from 'src/refresh_token/entities/refresh_token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminAccount, AdminRefreshToken])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService, TypeOrmModule],
})
export class AdminModule {}
