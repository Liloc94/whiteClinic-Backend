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
exports.CreateOrderPayDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOrderPayDTO {
}
exports.CreateOrderPayDTO = CreateOrderPayDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '고객 ID',
        example: '1, 2, 3 ...',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOrderPayDTO.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '총 결제 금액',
        example: '32500, 72000, 12900 ...',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOrderPayDTO.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '계약금',
        example: '32500, 72000, 12900 ...',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOrderPayDTO.prototype, "depositAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '잔금',
        example: '32500, 72000, 12900 ...',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOrderPayDTO.prototype, "balanceAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '할인 금액',
        example: '32500, 72000, 12900 ...',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOrderPayDTO.prototype, "discountAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '계약금 결제 방식',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderPayDTO.prototype, "depositMethodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '잔금 결제 방식',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderPayDTO.prototype, "balanceMethodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '계약금 영수증',
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderPayDTO.prototype, "depositReceipt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '잔금 영수증',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderPayDTO.prototype, "balanceReceipt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '영수증 발행 여부',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateOrderPayDTO.prototype, "receiptIssued", void 0);
//# sourceMappingURL=create-orderpay.dto.js.map