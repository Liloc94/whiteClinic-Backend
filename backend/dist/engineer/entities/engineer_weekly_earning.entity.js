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
exports.EngineerWeeklyEarning = void 0;
const typeorm_1 = require("typeorm");
let EngineerWeeklyEarning = class EngineerWeeklyEarning {
};
exports.EngineerWeeklyEarning = EngineerWeeklyEarning;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EngineerWeeklyEarning.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int2' }),
    __metadata("design:type", Number)
], EngineerWeeklyEarning.prototype, "engineer_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], EngineerWeeklyEarning.prototype, "weekly", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int4' }),
    __metadata("design:type", Number)
], EngineerWeeklyEarning.prototype, "weekly_earning", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], EngineerWeeklyEarning.prototype, "isPaid", void 0);
exports.EngineerWeeklyEarning = EngineerWeeklyEarning = __decorate([
    (0, typeorm_1.Entity)('engineer_weekly_earning')
], EngineerWeeklyEarning);
//# sourceMappingURL=engineer_weekly_earning.entity.js.map