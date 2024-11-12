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
exports.CustomerResponseDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const order_response_dto_1 = require("../../order-info/dto/order-response.dto");
class CustomerResponseDTO {
}
exports.CustomerResponseDTO = CustomerResponseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고유번호' }),
    __metadata("design:type", Number)
], CustomerResponseDTO.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '예약 날짜' }),
    __metadata("design:type", Date)
], CustomerResponseDTO.prototype, "bookingDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '예약 시간',
    }),
    __metadata("design:type", String)
], CustomerResponseDTO.prototype, "orderTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '고객 이름' }),
    __metadata("design:type", String)
], CustomerResponseDTO.prototype, "customerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전화번호' }),
    __metadata("design:type", String)
], CustomerResponseDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주소' }),
    __metadata("design:type", String)
], CustomerResponseDTO.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '특이사항', required: false }),
    __metadata("design:type", String)
], CustomerResponseDTO.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '주문 목록',
        type: [order_response_dto_1.OrderResponseDTO],
    }),
    __metadata("design:type", order_response_dto_1.OrderResponseDTO)
], CustomerResponseDTO.prototype, "orders", void 0);
//# sourceMappingURL=customer-response.dto.js.map