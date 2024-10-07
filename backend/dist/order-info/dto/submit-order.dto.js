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
exports.SubmitOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SubmitOrderDto {
}
exports.SubmitOrderDto = SubmitOrderDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '주문 일자' }),
    __metadata("design:type", String)
], SubmitOrderDto.prototype, "orderDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '고객 성함' }),
    __metadata("design:type", String)
], SubmitOrderDto.prototype, "customerName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '고객 연락처' }),
    __metadata("design:type", String)
], SubmitOrderDto.prototype, "customerPhoneNum", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '고객 주소지' }),
    __metadata("design:type", String)
], SubmitOrderDto.prototype, "customerAddr", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '고객 특이사항' }),
    __metadata("design:type", String)
], SubmitOrderDto.prototype, "customerComments", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '결제 방식' }),
    __metadata("design:type", String)
], SubmitOrderDto.prototype, "customerPayment", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: '영수증 종류' }),
    __metadata("design:type", String)
], SubmitOrderDto.prototype, "customerReciept", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({ description: '영수증 발행여부' }),
    __metadata("design:type", Boolean)
], SubmitOrderDto.prototype, "checkReciept", void 0);
//# sourceMappingURL=submit-order.dto.js.map