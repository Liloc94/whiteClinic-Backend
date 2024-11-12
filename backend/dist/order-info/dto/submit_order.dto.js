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
    (0, swagger_1.ApiProperty)({ description: '고유 아이디' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SubmitOrderDto.prototype, "order_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '예약일자' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitOrderDto.prototype, "order_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객성함' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitOrderDto.prototype, "customer_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '연락처' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitOrderDto.prototype, "customer_contact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '방문주소' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitOrderDto.prototype, "customer_addr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '특이사항' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitOrderDto.prototype, "customer_remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '입금여부' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SubmitOrderDto.prototype, "isPayed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '예약금' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SubmitOrderDto.prototype, "bookingFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '결제방식',
        enum: ['계좌이체', '카드결제', '숨고페이', '현금결제'],
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitOrderDto.prototype, "paymentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '증빙서류',
        enum: ['간이영수증', '세금계산서', '현금영수증', '카드영수증', '필요없음'],
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitOrderDto.prototype, "recieptDocs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '발행여부' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SubmitOrderDto.prototype, "isIssued", void 0);
//# sourceMappingURL=submit_order.dto.js.map