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
exports.CreateEngineerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateEngineerDto {
}
exports.CreateEngineerDto = CreateEngineerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기사성함' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEngineerDto.prototype, "engineer_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '연락처' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEngineerDto.prototype, "engineer_phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '거주지역' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEngineerDto.prototype, "engineer_addr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '가능품목',
        enum: [
            '벽걸이',
            '원웨이',
            '포웨이',
            '원형',
            '스탠드',
            '실외기',
            '덕트',
            '창문형',
            '통돌이',
            '드럼',
            '빌트인',
            '건조기',
        ],
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateEngineerDto.prototype, "engineer_valid_skill", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기사 특이사항' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEngineerDto.prototype, "engineer_remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수당률',
        enum: [50, 55, 60, 65, 70, 75, 80],
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEngineerDto.prototype, "engineer_commission_rate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '급여요일',
        enum: [
            '월요일',
            '화요일',
            '수요일',
            '목요일',
            '금요일',
            '토요일',
            '일요일',
        ],
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEngineerDto.prototype, "engineer_payday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '비정기휴무 (복수일 경우 배열 형태로 전달)',
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateEngineerDto.prototype, "engineer_holiday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '정기휴무',
        enum: [
            '월요일',
            '화요일',
            '수요일',
            '목요일',
            '금요일',
            '토요일',
            '일요일',
        ],
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEngineerDto.prototype, "engineer_dayoff", void 0);
//# sourceMappingURL=create-engineer.dto.js.map