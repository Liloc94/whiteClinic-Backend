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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const register_auth_dto_1 = require("./dto/register-auth.dto");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const refresh_token_dto_1 = require("../refresh_token/dto/refresh_token.dto");
const jwt_auth_guard_1 = require("./guards/jwt_auth.guard");
const roles_guard_1 = require("./guards/roles.guard");
const roles_decorator_1 = require("./decorators/roles.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto) {
        const { adminID, adminPW, role } = registerDto;
        const admin = await this.authService.register(adminID, adminPW, role);
        return { message: '회원가입 성공', id: admin.id };
    }
    async signIn(signInDto) {
        return this.authService.signIn(signInDto.adminID, signInDto.adminPW);
    }
    async refresh(refreshTokenDto) {
        const { refresh_token } = refreshTokenDto;
        return this.authService.refreshAccessToken(refresh_token);
    }
    async logout(body) {
        const { refresh_token } = body;
        await this.authService.logout(refresh_token);
        return { message: '로그아웃 성공' };
    }
    async logoutAll(req) {
        const user = req.user;
        await this.authService.logoutAll(user.id);
        return { message: '전체 로그아웃 성공' };
    }
    getProfile(req) {
        const user = req.user;
        return { id: user.id, username: user.adminid, role: user.role };
    }
    getAdminData() {
        return { message: 'Admin Data' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiBody)({ type: register_auth_dto_1.RegisterAuthDTO }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '회원가입 성공' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_auth_dto_1.RegisterAuthDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiBody)({ type: create_auth_dto_1.CreateAuthDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '로그인 성공' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, swagger_1.ApiBody)({ type: refresh_token_dto_1.RefreshTokenDTO }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Access Token과 Refresh Token 재발급',
        type: refresh_token_dto_1.RefreshTokenDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiBody)({ type: refresh_token_dto_1.RefreshTokenDTO }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '로그아웃 ' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('logoutAll'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiResponse)({ status: 200, description: '전체 로그아웃' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('Profile'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User profile retrived successfully',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('admin'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Admin data retrived successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAdminData", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('토큰인증 API'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map