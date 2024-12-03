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
exports.ScheduleInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ScheduleInfoDto {
}
exports.ScheduleInfoDto = ScheduleInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주문ID' }),
    __metadata("design:type", Number)
], ScheduleInfoDto.prototype, "order_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기사ID' }),
    __metadata("design:type", Number)
], ScheduleInfoDto.prototype, "engineer_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객ID' }),
    __metadata("design:type", Number)
], ScheduleInfoDto.prototype, "customer_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '예약일자' }),
    __metadata("design:type", String)
], ScheduleInfoDto.prototype, "order_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객성함' }),
    __metadata("design:type", String)
], ScheduleInfoDto.prototype, "customer_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객연락처' }),
    __metadata("design:type", String)
], ScheduleInfoDto.prototype, "customer_phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객주소' }),
    __metadata("design:type", String)
], ScheduleInfoDto.prototype, "customer_addr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객 특이사항' }),
    __metadata("design:type", String)
], ScheduleInfoDto.prototype, "customer_remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '예약금 지불여부' }),
    __metadata("design:type", Boolean)
], ScheduleInfoDto.prototype, "deposit_paid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '예약금' }),
    __metadata("design:type", Number)
], ScheduleInfoDto.prototype, "order_deposit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '지불방식' }),
    __metadata("design:type", String)
], ScheduleInfoDto.prototype, "order_payment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '제품 카테고리' }),
    __metadata("design:type", String)
], ScheduleInfoDto.prototype, "order_category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주문품목' }),
    __metadata("design:type", String)
], ScheduleInfoDto.prototype, "order_product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '영수증' }),
    __metadata("design:type", String)
], ScheduleInfoDto.prototype, "order_receipt_docs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '영수증 발행여부' }),
    __metadata("design:type", Boolean)
], ScheduleInfoDto.prototype, "receipt_docs_issued", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '세척 금액' }),
    __metadata("design:type", Number)
], ScheduleInfoDto.prototype, "order_total_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '세척 대수' }),
    __metadata("design:type", Number)
], ScheduleInfoDto.prototype, "order_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주문 특이사항' }),
    __metadata("design:type", String)
], ScheduleInfoDto.prototype, "order_remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '할인 여부' }),
    __metadata("design:type", Boolean)
], ScheduleInfoDto.prototype, "order_isDiscount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '할인율' }),
    __metadata("design:type", Number)
], ScheduleInfoDto.prototype, "order_discount_ratio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기사성함' }),
    __metadata("design:type", String)
], ScheduleInfoDto.prototype, "engineer_name", void 0);
//# sourceMappingURL=search-schedule-dto.js.map