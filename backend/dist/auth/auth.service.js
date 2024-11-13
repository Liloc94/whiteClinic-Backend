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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("../admin/admin.service");
const refresh_token_service_1 = require("../refresh_token/refresh_token.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
let AuthService = class AuthService {
    constructor(adminService, refreshTokenService, jwtService) {
        this.adminService = adminService;
        this.refreshTokenService = refreshTokenService;
        this.jwtService = jwtService;
    }
    async signIn(adminID, adminPW) {
        const user = await this.adminService.findOne(adminID);
        if (!user || !(await bcrypt.compare(adminPW, user.admin_pw))) {
            throw new common_1.UnauthorizedException('인증되지 않은 사용자');
        }
        await this.logoutAll(user.idx);
        const updateUser = await this.adminService.findOne(adminID);
        const payload = {
            sub: updateUser.idx,
            username: updateUser.admin_id,
            role: updateUser.role,
            tokenVersion: updateUser.token_version,
        };
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '5m',
            algorithm: 'RS256',
        });
        const refreshToken = this.generateRefreshToken();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.refreshTokenService.saveRefreshToken(user, refreshToken, expiresAt);
        return { access_token: accessToken, refresh_token: refreshToken };
    }
    generateRefreshToken() {
        return crypto.randomBytes(64).toString('hex');
    }
    async refreshAccessToken(refreshToken) {
        const storedRefreshToken = await this.refreshTokenService.findByToken(refreshToken);
        if (!storedRefreshToken) {
            throw new common_1.UnauthorizedException('refresh Token does not exist');
        }
        const now = new Date();
        if (storedRefreshToken.expires_at < now) {
            await this.refreshTokenService.removeRefreshToken(refreshToken);
            throw new common_1.UnauthorizedException('Refresh Token has been expired');
        }
        const user = storedRefreshToken;
        await this.refreshTokenService.removeRefreshToken(refreshToken);
        await this.adminService.incrementTokenVersion(user.idx);
        const updateUser = await this.adminService.findOne(user.admin.admin_id);
        const newRefreshToken = this.generateRefreshToken();
        const newExpiresAt = new Date();
        newExpiresAt.setDate(newExpiresAt.getDate() + 7);
        await this.refreshTokenService.saveRefreshToken(updateUser, newRefreshToken, newExpiresAt);
        const payload = {
            sub: updateUser.idx,
            username: updateUser.admin_id,
            role: updateUser.role,
            tokenVersion: updateUser.token_version,
        };
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '5m',
            algorithm: 'RS256',
        });
        return { access_token: accessToken, refresh_token: newRefreshToken };
    }
    async logout(refreshToken) {
        const storedRefreshToken = await this.refreshTokenService.findByToken(refreshToken);
        if (storedRefreshToken) {
            const admin = storedRefreshToken.admin;
            await this.refreshTokenService.removeRefreshToken(refreshToken);
            await this.adminService.incrementTokenVersion(admin.idx);
        }
    }
    async logoutAll(id) {
        await this.refreshTokenService.removeAllRefreshToken(id);
    }
    async register(adminID, adminPW, role = 'admin') {
        return this.adminService.createAdmin(adminID, adminPW, role);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        refresh_token_service_1.RefreshTokenService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map