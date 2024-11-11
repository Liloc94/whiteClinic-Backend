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
exports.WeekDays = void 0;
const typeorm_1 = require("typeorm");
let WeekDays = class WeekDays {
};
exports.WeekDays = WeekDays;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], WeekDays.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'day_name', nullable: true }),
    __metadata("design:type", String)
], WeekDays.prototype, "dayName", void 0);
exports.WeekDays = WeekDays = __decorate([
    (0, typeorm_1.Entity)('weekdays')
], WeekDays);
//# sourceMappingURL=WeekDays.entity.js.map