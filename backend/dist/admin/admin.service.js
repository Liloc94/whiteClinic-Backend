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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const admin_entity_1 = require("./entities/admin.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
let AdminService = class AdminService {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    async createAdmin(adminid, adminpw, role = 'admin') {
        const hashedPassword = await bcrypt.hash(adminpw, 10);
        const admin = this.adminRepository.create({
            adminid,
            adminpw: hashedPassword,
            role,
        });
        return this.adminRepository.save(admin);
    }
    async findOne(adminid) {
        const admin = await this.adminRepository.findOne({
            where: { adminid },
            relations: ['refreshTokens'],
        });
        if (admin) {
            console.log('refreshTokensResult :', admin.refreshTokens);
            console.log('adminID', admin.adminid);
            console.log('adminPW', admin.adminpw);
            return admin;
        }
        else {
            throw new common_1.UnauthorizedException('아이디와 일치하는 회원정보가 존재하지 않습니다.');
        }
    }
    async incrementTokenVersion(id) {
        await this.adminRepository.increment({ id }, 'tokenVersion', 1);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map