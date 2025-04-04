"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app/app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const refresh_token_module_1 = require("./refreshToken/refresh_token.module");
const admin_module_1 = require("./admin/admin.module");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const order_info_module_1 = require("./order/order_info.module");
const customer_module_1 = require("./customer/customer.module");
const engineer_module_1 = require("./engineer/engineer.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
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
                inject: [config_1.ConfigService],
            }),
            refresh_token_module_1.RefreshTokenModule,
            admin_module_1.AdminModule,
            auth_module_1.AuthModule,
            jwt_1.JwtModule,
            order_info_module_1.OrderInfoModule,
            customer_module_1.CustomerModule,
            engineer_module_1.EngineerModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map