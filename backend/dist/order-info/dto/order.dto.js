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
exports.OrderDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class OrderDTO {
}
exports.OrderDTO = OrderDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주문 고유번호', example: 1 }),
    __metadata("design:type", Number)
], OrderDTO.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객 ID', example: 1 }),
    __metadata("design:type", Number)
], OrderDTO.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '제품 상세 ID', example: 2 }),
    __metadata("design:type", Number)
], OrderDTO.prototype, "productDetailId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제품 관련 특이사항',
        required: false,
    }),
    __metadata("design:type", String)
], OrderDTO.prototype, "productRemark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '세척 대수' }),
    __metadata("design:type", Number)
], OrderDTO.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '할인 금액 (주문)',
        required: false,
    }),
    __metadata("design:type", Number)
], OrderDTO.prototype, "discountAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '총 금액' }),
    __metadata("design:type", Number)
], OrderDTO.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '비고',
        required: false,
    }),
    __metadata("design:type", String)
], OrderDTO.prototype, "remark", void 0);
//# sourceMappingURL=order.dto.js.map