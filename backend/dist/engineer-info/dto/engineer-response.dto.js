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
exports.EngineerResponseDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class EngineerResponseDTO {
}
exports.EngineerResponseDTO = EngineerResponseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고유번호' }),
    __metadata("design:type", Number)
], EngineerResponseDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이름' }),
    __metadata("design:type", String)
], EngineerResponseDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전화번호' }),
    __metadata("design:type", String)
], EngineerResponseDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '거주 지역' }),
    __metadata("design:type", String)
], EngineerResponseDTO.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '비고' }),
    __metadata("design:type", String)
], EngineerResponseDTO.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기사님 스킬 목록',
    }),
    __metadata("design:type", Array)
], EngineerResponseDTO.prototype, "skills", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수당률' }),
    __metadata("design:type", String)
], EngineerResponseDTO.prototype, "commissionRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주급 지급날짜' }),
    __metadata("design:type", String)
], EngineerResponseDTO.prototype, "payday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '지급 여부' }),
    __metadata("design:type", Boolean)
], EngineerResponseDTO.prototype, "isPaid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '일급',
    }),
    __metadata("design:type", Array)
], EngineerResponseDTO.prototype, "dailyEarnings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '정기 휴무 요일 목록',
    }),
    __metadata("design:type", Array)
], EngineerResponseDTO.prototype, "dayoffs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '비정기 휴무일 목록',
        required: false,
    }),
    __metadata("design:type", Array)
], EngineerResponseDTO.prototype, "holidays", void 0);
//# sourceMappingURL=engineer-response.dto.js.map