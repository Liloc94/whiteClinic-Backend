"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const admin_module_1 = require("../admin/admin.module");
const refresh_token_module_1 = require("../refresh_token/refresh_token.module");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("./jwt.strategy");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            admin_module_1.AdminModule,
            refresh_token_module_1.RefreshTokenModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule.forRoot({ isGlobal: true })],
                useFactory: async (configService) => {
                    console.log('PRIVATE_KEY:', configService.get('PRIVATE_KEY'));
                    console.log('PUBLIC_KEY:', configService.get('PUBLIC_KEY'));
                    return {
                        privateKey: configService.get('PRIVATE_KEY'),
                        publicKey: configService.get('PUBLIC_KEY'),
                        signOptions: {
                            algorithm: 'RS256',
                            expiresIn: '5m',
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [jwt_1.JwtModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map