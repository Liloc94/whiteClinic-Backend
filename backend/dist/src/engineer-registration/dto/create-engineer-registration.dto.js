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
exports.CreateRegistrationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const engineer_skills_dto_1 = require("./engineer-skills.dto");
const class_transformer_1 = require("class-transformer");
const engineer_dailyearning_dto_1 = require("./engineer-dailyearning.dto");
class CreateRegistrationDto {
}
exports.CreateRegistrationDto = CreateRegistrationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기사님 성함',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRegistrationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '전화번호',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRegistrationDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '거주 지역',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRegistrationDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '비고',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateRegistrationDto.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기사님 스킬 목록',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => engineer_skills_dto_1.EngineerSkillsDTO),
    __metadata("design:type", Array)
], CreateRegistrationDto.prototype, "skills", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수당률',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRegistrationDto.prototype, "commissionRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '주급 지급 요일',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRegistrationDto.prototype, "payday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '지급 여부',
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRegistrationDto.prototype, "isPaid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '일급 목록',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => engineer_dailyearning_dto_1.EngineerDailyEarningDto),
    __metadata("design:type", Array)
], CreateRegistrationDto.prototype, "dailyEarnings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '정기 휴무 요일',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateRegistrationDto.prototype, "dayoff", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '비정기 휴무일',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateRegistrationDto.prototype, "holiday", void 0);
//# sourceMappingURL=create-engineer-registration.dto.js.map