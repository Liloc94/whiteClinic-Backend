import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenModule } from './refreshToken/refresh_token.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { OrderInfoModule } from './order/order_info.module';
import { CustomerModule } from './customer/customer.module';
import { EngineerModule } from './engineer/engineer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        ssl: { rejectUnauthorized: false },
        schema: 'white_clinic',
        entities: [],
        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: true,
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    RefreshTokenModule,
    AdminModule,
    AuthModule,
    JwtModule,
    OrderInfoModule,
    CustomerModule,
    EngineerModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
