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
exports.EngineerPayday = void 0;
const typeorm_1 = require("typeorm");
const engineer_entity_1 = require("./engineer.entity");
const WeekDays_entity_1 = require("../../engineer-registration/entities/WeekDays.entity");
let EngineerPayday = class EngineerPayday {
};
exports.EngineerPayday = EngineerPayday;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EngineerPayday.prototype, "paydayId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'engineer_id' }),
    __metadata("design:type", Number)
], EngineerPayday.prototype, "engineerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'weekday_id', nullable: true }),
    __metadata("design:type", Number)
], EngineerPayday.prototype, "weekdayId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_pay', type: 'boolean' }),
    __metadata("design:type", Boolean)
], EngineerPayday.prototype, "isPay", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => engineer_entity_1.Engineer),
    (0, typeorm_1.JoinColumn)({ name: 'engineer_id' }),
    __metadata("design:type", engineer_entity_1.Engineer)
], EngineerPayday.prototype, "engineer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => WeekDays_entity_1.WeekDays),
    (0, typeorm_1.JoinColumn)({ name: 'weekday_id' }),
    __metadata("design:type", WeekDays_entity_1.WeekDays)
], EngineerPayday.prototype, "weekday", void 0);
exports.EngineerPayday = EngineerPayday = __decorate([
    (0, typeorm_1.Entity)('engineer_payday')
], EngineerPayday);
//# sourceMappingURL=engineer_payday.entity.js.map