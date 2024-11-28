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
exports.AdminAccount = void 0;
const typeorm_1 = require("typeorm");
const refresh_token_entity_1 = require("../../refresh_token/entities/refresh_token.entity");
const class_validator_1 = require("class-validator");
let AdminAccount = class AdminAccount {
};
exports.AdminAccount = AdminAccount;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AdminAccount.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], AdminAccount.prototype, "admin_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], AdminAccount.prototype, "admin_pw", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminAccount.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], AdminAccount.prototype, "token_version", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => refresh_token_entity_1.AdminRefreshToken, (refreshToken) => refreshToken.admin),
    __metadata("design:type", Array)
], AdminAccount.prototype, "refreshTokens", void 0);
exports.AdminAccount = AdminAccount = __decorate([
    (0, typeorm_1.Entity)('admin_account')
], AdminAccount);
//# sourceMappingURL=admin_account.entity.js.map