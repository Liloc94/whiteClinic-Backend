import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenModule } from 'src/refreshToken/refresh_token.module';
import { AdminModule } from 'src/admin/admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { OrderInfoModule } from 'src/order/order_info.module';
import { CustomerModule } from 'src/customer/customer.module';
import { EngineerModule } from 'src/engineer/engineer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.get('DATABASE_URL');
        if (!dbUrl) {
          throw new Error('DATABASE_URL is not defined');
        }
        return {
          type: 'postgres',
          url: dbUrl,
          ssl: { rejectUnauthorized: false },
          schema: 'white_clinic',
          entities: [],
          autoLoadEntities: true,
          synchronize: false,
          migrationsRun: true,
          logging: configService.get('NODE_ENV') === 'development',
          poolSize: 1,
          extra: {
            max: 1,
            connectionTimeoutMillis: 5000,
          },
        };
      },
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
