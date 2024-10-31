import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { OrderInfoModule } from './order-info/order-info.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngineerInfoModule } from './engineer-info/engineer-info.module';
import { RegistrationModule } from './engineer-registration/registration.module';
import { RefreshTokenModule } from './refresh_token/refresh_token.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 환경 변수를 전역으로 사용
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'node_modules/swagger-ui-dist'),
      serveRoot: '/api-docs',
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-cold-band-a71ed1zj-pooler.ap-southeast-2.aws.neon.tech',
      url: 'postgres://default:hNOtdfu8sWy3@ep-cold-band-a71ed1zj-pooler.ap-southeast-2.aws.neon.tech:5432/verceldb?sslmode=require',
      ssl: { rejectUnauthorized: false },
      username: 'default',
      password: 'hNOtdfu8sWy3',
      database: 'verceldb',
      entities: [],
      autoLoadEntities: true,
      synchronize: false,
      logging: true, // 로그 확인용 옵션
    }),
    OrderInfoModule,
    EngineerInfoModule,
    RegistrationModule,
    RefreshTokenModule,
    AdminModule,
    AuthModule,
    RegistrationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
