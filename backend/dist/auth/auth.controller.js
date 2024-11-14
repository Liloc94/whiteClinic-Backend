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
        return { message: '회원가입 성공', id: admin.idx };
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
        return { id: user.idx, username: user.admin_id, role: user.role };
    }
    getAdminData() {
        return { message: 'Admin Data' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({
        summary: '입력정보 기반 회원등록',
        description: '입력한 정보를 기반으로 회원정보를 DB에 저장한다.',
    }),
    (0, swagger_1.ApiBody)({ type: register_auth_dto_1.RegisterAuthDTO }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '회원가입 성공' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_auth_dto_1.RegisterAuthDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: '입력한 회원정보 DB 조회 및 대조 이후 로그인',
        description: 'DB 내에서 회원 아이디 및 패스워드 조회 이후 입력된 로그인 정보와 대조한 후에 일치하면 로그인. 이후 accessToken과 refreshToken이 발급 된다. 해당 토큰들을 사용하여 authorize 가능하다.',
    }),
    (0, swagger_1.ApiBody)({ type: create_auth_dto_1.CreateAuthDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '로그인 성공' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, swagger_1.ApiOperation)({
        summary: 'refresh token을 사용하여 access token 갱신',
        description: 'refresh token 존재 여부를 체크하고 존재할 시에 새로운 access token 을 재발급한다.',
    }),
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
    (0, swagger_1.ApiOperation)({
        summary: '로그아웃 API',
        description: '로그아웃 실행 시 보유하고 있는 refresh token 과 access 토큰을 모두 제거한다.',
    }),
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
    (0, swagger_1.ApiOperation)({
        summary: '모든 유저의 일괄 로그아웃',
        description: '모든 유저의 토큰을 일괄적으로 삭제한다.',
    }),
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
    (0, swagger_1.ApiOperation)({
        summary: '로그인 중인 유저 프로필 정보 확인 API',
        description: '고유 아이디 및 유저 아이디와 역할을 조회 및 확인 가능',
    }),
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
    (0, swagger_1.ApiOperation)({
        summary: 'token 값 존재여부 체크용 API , status code 200 반환 시 token 값 이 존재하는 것을 체크할 수 있다.',
    }),
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