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
exports.RegularHolidays = void 0;
const engineer_entity_1 = require("../../engineer-info/entities/engineer.entity");
const typeorm_1 = require("typeorm");
const weekdays_entity_1 = require("./weekdays.entity");
let RegularHolidays = class RegularHolidays {
};
exports.RegularHolidays = RegularHolidays;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RegularHolidays.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'engineer_id' }),
    __metadata("design:type", Number)
], RegularHolidays.prototype, "engineerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'weekday_id' }),
    __metadata("design:type", Number)
], RegularHolidays.prototype, "weekdayId", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'enginerId' }),
    __metadata("design:type", engineer_entity_1.Engineer)
], RegularHolidays.prototype, "engineer", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'weekdayId' }),
    __metadata("design:type", weekdays_entity_1.WeekDays)
], RegularHolidays.prototype, "weekday", void 0);
exports.RegularHolidays = RegularHolidays = __decorate([
    (0, typeorm_1.Entity)('regularholidays')
], RegularHolidays);
//# sourceMappingURL=regular_holiday.entity.js.map