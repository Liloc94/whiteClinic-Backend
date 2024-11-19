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
exports.AdminRefreshToken = void 0;
const admin_account_entity_1 = require("../../admin/entities/admin_account.entity");
const typeorm_1 = require("typeorm");
let AdminRefreshToken = class AdminRefreshToken {
};
exports.AdminRefreshToken = AdminRefreshToken;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AdminRefreshToken.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], AdminRefreshToken.prototype, "refresh_token", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], AdminRefreshToken.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", Date)
], AdminRefreshToken.prototype, "expires_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_account_entity_1.AdminAccount, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", admin_account_entity_1.AdminAccount)
], AdminRefreshToken.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'admin_id' }),
    __metadata("design:type", admin_account_entity_1.AdminAccount)
], AdminRefreshToken.prototype, "admin", void 0);
exports.AdminRefreshToken = AdminRefreshToken = __decorate([
    (0, typeorm_1.Entity)('admin_refresh_tokens')
], AdminRefreshToken);
//# sourceMappingURL=refresh_token.entity.js.map