"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const refresh_token_entity_1 = require("./entities/refresh_token.entity");
let RefreshTokenService = class RefreshTokenService {
    constructor(refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }
    async saveRefreshToken(admin, token, expiresAt) {
        await this.refreshTokenRepository.delete({ admin });
        const refreshToken = this.refreshTokenRepository.create({
            token,
            admin,
            expiresAt,
        });
        return this.refreshTokenRepository.save(refreshToken);
    }
    async findByToken(token) {
        const RefreshResult = this.refreshTokenRepository.findOne({
            where: { token },
            relations: ['admin'],
        });
        console.log('RefreshResult Token 검증(로그아웃) : ', (await RefreshResult).token);
        console.log((await RefreshResult).admin);
        return RefreshResult;
    }
    async removeRefreshToken(token) {
        await this.refreshTokenRepository.delete({ token });
    }
    async removeAllRefreshToken(id) {
        await this.refreshTokenRepository.delete({ admin: { id } });
    }
    async removeExpiredRefreshTokens() {
        const now = new Date();
        await this.refreshTokenRepository.delete({ expiresAt: (0, typeorm_2.LessThan)(now) });
    }
};
exports.RefreshTokenService = RefreshTokenService;
exports.RefreshTokenService = RefreshTokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RefreshTokenService);
//# sourceMappingURL=refresh_token.service.js.map