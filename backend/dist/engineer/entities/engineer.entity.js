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
exports.Engineer = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const engineer_daily_earning_entity_1 = require("./engineer_daily_earning.entity");
const engineer_weekly_earning_entity_1 = require("./engineer_weekly_earning.entity");
let Engineer = class Engineer {
};
exports.Engineer = Engineer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'integer',
        name: 'engineer_id',
    }),
    __metadata("design:type", Number)
], Engineer.prototype, "engineer_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => engineer_daily_earning_entity_1.EngineerDailyEarning, (dailyEarning) => dailyEarning.engineer),
    __metadata("design:type", Array)
], Engineer.prototype, "dailyEarnings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => engineer_weekly_earning_entity_1.EngineerWeeklyEarning, (weeklyEarning) => weeklyEarning.engineer_id),
    __metadata("design:type", Array)
], Engineer.prototype, "weeklyEarnings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Engineer.prototype, "engineer_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Engineer.prototype, "engineer_phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Engineer.prototype, "engineer_addr", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Engineer.prototype, "engineer_remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Engineer.prototype, "engineer_commission_rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Engineer.prototype, "engineer_dayoff", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], Engineer.prototype, "engineer_holiday", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Engineer.prototype, "engineer_payday", void 0);
exports.Engineer = Engineer = __decorate([
    (0, typeorm_1.Entity)('engineer', { schema: 'white_clinic' })
], Engineer);
//# sourceMappingURL=engineer.entity.js.map