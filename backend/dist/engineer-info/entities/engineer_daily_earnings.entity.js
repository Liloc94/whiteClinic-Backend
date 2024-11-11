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
exports.EngineerDailyEarnings = void 0;
const typeorm_1 = require("typeorm");
const engineer_entity_1 = require("./engineer.entity");
let EngineerDailyEarnings = class EngineerDailyEarnings {
};
exports.EngineerDailyEarnings = EngineerDailyEarnings;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'engineer_dailyearning_id' }),
    __metadata("design:type", Number)
], EngineerDailyEarnings.prototype, "engineerDailyEarningId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => engineer_entity_1.Engineer),
    (0, typeorm_1.JoinColumn)({ name: 'engineer_id' }),
    __metadata("design:type", engineer_entity_1.Engineer)
], EngineerDailyEarnings.prototype, "engineer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], EngineerDailyEarnings.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'daily_amount', type: 'decimal', precision: 20, scale: 2 }),
    __metadata("design:type", Number)
], EngineerDailyEarnings.prototype, "dailyAmount", void 0);
exports.EngineerDailyEarnings = EngineerDailyEarnings = __decorate([
    (0, typeorm_1.Entity)('engineer_daily_earnings')
], EngineerDailyEarnings);
//# sourceMappingURL=engineer_daily_earnings.entity.js.map