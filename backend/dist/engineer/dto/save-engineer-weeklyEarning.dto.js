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
exports.EngineerWeeklySalaryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class EngineerWeeklySalaryDto {
}
exports.EngineerWeeklySalaryDto = EngineerWeeklySalaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기사 ID' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EngineerWeeklySalaryDto.prototype, "engineer_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기사 주급' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EngineerWeeklySalaryDto.prototype, "engineer_weekly_salary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '지급 여부' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EngineerWeeklySalaryDto.prototype, "isPaid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'n 주차' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EngineerWeeklySalaryDto.prototype, "weekly", void 0);
//# sourceMappingURL=save-engineer-weeklyEarning.dto.js.map