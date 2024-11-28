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
    async saveRefreshToken(admin, refresh_token, expires_at) {
        await this.refreshTokenRepository.delete({ refresh_token });
        const refreshToken = this.refreshTokenRepository.create({
            admin,
            refresh_token,
            expires_at,
        });
        return this.refreshTokenRepository.save({ ...refreshToken });
    }
    async findByToken(refresh_token) {
        const RefreshResult = this.refreshTokenRepository.findOne({
            where: { refresh_token },
            relations: ['admin'],
        });
        return RefreshResult;
    }
    async removeRefreshToken(refresh_token) {
        await this.refreshTokenRepository.delete({ refresh_token });
        await this.refreshTokenRepository.query(` SELECT setval('admin_refresh_tokens_idx_seq', (SELECT MAX(idx) FROM admin_refresh_tokens));`);
    }
    async removeAllRefreshToken(idx) {
        await this.refreshTokenRepository.delete({ idx });
    }
    async removeExpiredRefreshTokens() {
        const now = new Date();
        await this.refreshTokenRepository.delete({ expires_at: (0, typeorm_2.LessThan)(now) });
    }
};
exports.RefreshTokenService = RefreshTokenService;
exports.RefreshTokenService = RefreshTokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(refresh_token_entity_1.AdminRefreshToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RefreshTokenService);
//# sourceMappingURL=refresh_token.service.js.map