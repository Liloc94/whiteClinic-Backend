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
exports.Admin = void 0;
const refresh_token_entity_1 = require("../../refresh_token/entities/refresh_token.entity");
const typeorm_1 = require("typeorm");
let Admin = class Admin {
};
exports.Admin = Admin;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Admin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Admin.prototype, "adminid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Admin.prototype, "adminpw", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'admin' }),
    __metadata("design:type", String)
], Admin.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Admin.prototype, "tokenVersion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => refresh_token_entity_1.RefreshToken, (refreshToken) => refreshToken.admin),
    __metadata("design:type", Array)
], Admin.prototype, "refreshTokens", void 0);
exports.Admin = Admin = __decorate([
    (0, typeorm_1.Entity)()
], Admin);
//# sourceMappingURL=admin.entity.js.map