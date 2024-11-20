import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenModule } from './refresh_token/refresh_token.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { OrderInfoModule } from './order_info/order_info.module';
import { CustomerModule } from './customer/customer.module';
import { EngineerModule } from './engineer/engineer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 환경 변수를 전역으로 사용
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-cold-band-a71ed1zj-pooler.ap-southeast-2.aws.neon.tech',
      url: 'postgres://default:hNOtdfu8sWy3@ep-cold-band-a71ed1zj-pooler.ap-southeast-2.aws.neon.tech:5432/verceldb?sslmode=require',
      ssl: { rejectUnauthorized: false },
      username: 'default',
      password: 'hNOtdfu8sWy3',
      database: 'verceldb',
      schema: 'white_clinic',
      entities: [],
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: true,
      logging: true,
    }),
    RefreshTokenModule,
    AdminModule,
    AuthModule,
    JwtModule,
    OrderInfoModule,
    CustomerModule,
    EngineerModule,
    RefreshTokenModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
