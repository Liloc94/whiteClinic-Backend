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
exports.AdminAuthTokens = void 0;
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("./admin.entity");
let AdminAuthTokens = class AdminAuthTokens {
};
exports.AdminAuthTokens = AdminAuthTokens;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AdminAuthTokens.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin),
    (0, typeorm_1.JoinColumn)({ name: 'admin_id' }),
    __metadata("design:type", admin_entity_1.Admin)
], AdminAuthTokens.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], AdminAuthTokens.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at', type: 'date' }),
    __metadata("design:type", Date)
], AdminAuthTokens.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expires_at', type: 'date' }),
    __metadata("design:type", Date)
], AdminAuthTokens.prototype, "expiresAt", void 0);
exports.AdminAuthTokens = AdminAuthTokens = __decorate([
    (0, typeorm_1.Entity)('admin_auth_tokens')
], AdminAuthTokens);
//# sourceMappingURL=admin_auth_tokens.entity.js.map