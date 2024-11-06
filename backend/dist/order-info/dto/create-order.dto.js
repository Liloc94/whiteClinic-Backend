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
exports.CreateOrderDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOrderDTO {
}
exports.CreateOrderDTO = CreateOrderDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '고객 ID',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOrderDTO.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '세척 품목 ID',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOrderDTO.prototype, "productDetailId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 관련 특이사항',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDTO.prototype, "productRemark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '세척 대수',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOrderDTO.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '할인 금액',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOrderDTO.prototype, "discountAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '총 금액',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOrderDTO.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '비고',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDTO.prototype, "remark", void 0);
//# sourceMappingURL=create-order.dto.js.map