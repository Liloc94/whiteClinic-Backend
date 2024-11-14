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
exports.OrderListDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class OrderListDto {
}
exports.OrderListDto = OrderListDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '예약일자' }),
    __metadata("design:type", String)
], OrderListDto.prototype, "order_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객성함' }),
    __metadata("design:type", String)
], OrderListDto.prototype, "customer_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객연락처' }),
    __metadata("design:type", String)
], OrderListDto.prototype, "customer_phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객주소' }),
    __metadata("design:type", String)
], OrderListDto.prototype, "customer_addr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '특이사항' }),
    __metadata("design:type", String)
], OrderListDto.prototype, "customer_remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '담당 기사성함' }),
    __metadata("design:type", String)
], OrderListDto.prototype, "engineer_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '청소품목' }),
    __metadata("design:type", String)
], OrderListDto.prototype, "order_product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결제방식',
        enum: ['계좌이체', '카드결제', '숨고페이', '현장현금결제'],
    }),
    __metadata("design:type", String)
], OrderListDto.prototype, "order_payment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '증빙서류',
        enum: ['간이영수증', '세금계산서', '현금영수증', '카드영수증', '필요없음'],
    }),
    __metadata("design:type", String)
], OrderListDto.prototype, "order_receipt_docs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '발행여부' }),
    __metadata("design:type", Boolean)
], OrderListDto.prototype, "receipt_docs_issued", void 0);
//# sourceMappingURL=search-order-list.dto.js.map