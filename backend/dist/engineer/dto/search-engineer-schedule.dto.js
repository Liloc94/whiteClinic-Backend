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
exports.EngineerScheduleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class EngineerScheduleDto {
}
exports.EngineerScheduleDto = EngineerScheduleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주문넘버' }),
    __metadata("design:type", Number)
], EngineerScheduleDto.prototype, "order_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기사넘버' }),
    __metadata("design:type", Number)
], EngineerScheduleDto.prototype, "engineer_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객넘버' }),
    __metadata("design:type", Number)
], EngineerScheduleDto.prototype, "customer_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '예약일자' }),
    __metadata("design:type", String)
], EngineerScheduleDto.prototype, "order_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '기사성함' }),
    __metadata("design:type", String)
], EngineerScheduleDto.prototype, "engineer_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객성함' }),
    __metadata("design:type", String)
], EngineerScheduleDto.prototype, "customer_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객주소' }),
    __metadata("design:type", String)
], EngineerScheduleDto.prototype, "customer_addr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객연락처' }),
    __metadata("design:type", String)
], EngineerScheduleDto.prototype, "customer_phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주문 카테고리 에어컨 or 세탁기' }),
    __metadata("design:type", String)
], EngineerScheduleDto.prototype, "order_product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주문 품목' }),
    __metadata("design:type", String)
], EngineerScheduleDto.prototype, "order_product_detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주문 대수' }),
    __metadata("design:type", Number)
], EngineerScheduleDto.prototype, "order_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '총 주문금액' }),
    __metadata("design:type", Number)
], EngineerScheduleDto.prototype, "order_total_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주문 특이사항' }),
    __metadata("design:type", String)
], EngineerScheduleDto.prototype, "order_remarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객 특이사항' }),
    __metadata("design:type", String)
], EngineerScheduleDto.prototype, "customer_remarks", void 0);
//# sourceMappingURL=search-engineer-schedule.dto.js.map