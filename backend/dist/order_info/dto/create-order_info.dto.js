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
exports.CreateOrderInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateOrderInfoDto {
}
exports.CreateOrderInfoDto = CreateOrderInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주문일자' }),
    __metadata("design:type", String)
], CreateOrderInfoDto.prototype, "order_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객 성함' }),
    __metadata("design:type", String)
], CreateOrderInfoDto.prototype, "order_customer_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객 연락처' }),
    __metadata("design:type", String)
], CreateOrderInfoDto.prototype, "order_customer_phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객 주소' }),
    __metadata("design:type", String)
], CreateOrderInfoDto.prototype, "order_customer_address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주문 특이사항' }),
    __metadata("design:type", String)
], CreateOrderInfoDto.prototype, "order_remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '예약금여부', default: false }),
    __metadata("design:type", Boolean)
], CreateOrderInfoDto.prototype, "deposit_payed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '예약금' }),
    __metadata("design:type", Number)
], CreateOrderInfoDto.prototype, "order_deposit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '지불방식',
        enum: ['계좌이체', '카드결제', '숨고페이', '현장현금결제'],
    }),
    __metadata("design:type", String)
], CreateOrderInfoDto.prototype, "order_payment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '증빙서류',
        enum: ['간이영수증', '세금계산서', '현금영수증', '카드영수증', '필요없음'],
    }),
    __metadata("design:type", String)
], CreateOrderInfoDto.prototype, "order_receipt_docs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '증빙서류 발행여부', default: false }),
    __metadata("design:type", Boolean)
], CreateOrderInfoDto.prototype, "receipt_docs_issued", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '제품 카테고리' }),
    __metadata("design:type", String)
], CreateOrderInfoDto.prototype, "order_category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '의뢰제품' }),
    __metadata("design:type", String)
], CreateOrderInfoDto.prototype, "order_product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주문대수' }),
    __metadata("design:type", Number)
], CreateOrderInfoDto.prototype, "order_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주문 총 금액' }),
    __metadata("design:type", Number)
], CreateOrderInfoDto.prototype, "order_total_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '할인여부', default: false }),
    __metadata("design:type", Boolean)
], CreateOrderInfoDto.prototype, "order_isdiscount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '할인율' }),
    __metadata("design:type", Number)
], CreateOrderInfoDto.prototype, "order_discount_ratio", void 0);
//# sourceMappingURL=create-order_info.dto.js.map