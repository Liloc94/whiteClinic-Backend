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
exports.OrderResponseDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const order_dto_1 = require("./order.dto");
class OrderResponseDTO {
}
exports.OrderResponseDTO = OrderResponseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객 ID' }),
    __metadata("design:type", Number)
], OrderResponseDTO.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '주문 목록',
        type: [order_dto_1.OrderDTO],
    }),
    __metadata("design:type", Array)
], OrderResponseDTO.prototype, "orders", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주문 결제 고유번호' }),
    __metadata("design:type", Number)
], OrderResponseDTO.prototype, "orderPayId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '계약금', example: 50000 }),
    __metadata("design:type", Number)
], OrderResponseDTO.prototype, "depositAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '잔금', example: 150000 }),
    __metadata("design:type", Number)
], OrderResponseDTO.prototype, "balanceAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '할인 금액 (결제)',
        required: false,
    }),
    __metadata("design:type", Number)
], OrderResponseDTO.prototype, "paymentDiscountAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '계약금 결제 방식 ID' }),
    __metadata("design:type", Number)
], OrderResponseDTO.prototype, "depositMethodTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '잔금 결제 방식 ID' }),
    __metadata("design:type", Number)
], OrderResponseDTO.prototype, "balanceMethodTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '계약금 영수증 ID' }),
    __metadata("design:type", Number)
], OrderResponseDTO.prototype, "depositReceiptId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '잔금 영수증 ID' }),
    __metadata("design:type", Number)
], OrderResponseDTO.prototype, "balanceReceiptId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '영수증 발행 여부' }),
    __metadata("design:type", Boolean)
], OrderResponseDTO.prototype, "receiptIssued", void 0);
//# sourceMappingURL=order-response.dto.js.map