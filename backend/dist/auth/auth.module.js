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
const jwt_strategy_1 = require("./jwt.strategy");
const config_1 = require("@nestjs/config");
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
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const privateKey = configService
                        .get('PRIVATE_KEY')
                        ?.replace(/\\n/g, '\n');
                    const publicKey = configService
                        .get('PUBLIC_KEY')
                        ?.replace(/\\n/g, '\n');
                    if (!privateKey || !publicKey) {
                        throw new Error('환경변수에 올바르지 않은 JWT Key가 존재합니다.');
                    }
                    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----') &&
                        !privateKey.includes('-----BEGIN RSA PRIVATE KEY-----')) {
                        throw new Error('올바르지 않은 키 포맷입니다.');
                    }
                    return {
                        privateKey: privateKey,
                        publicKey: publicKey,
                        signOptions: {
                            algorithm: 'RS256',
                            expiresIn: '5m',
                        },
                        verifyOptions: { algorithms: ['RS256'] },
                    };
                },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [jwt_1.JwtModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map