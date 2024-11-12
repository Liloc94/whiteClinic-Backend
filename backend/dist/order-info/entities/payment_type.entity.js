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
exports.PaymentType = void 0;
const typeorm_1 = require("typeorm");
let PaymentType = class PaymentType {
};
exports.PaymentType = PaymentType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'payment_method_type_id' }),
    __metadata("design:type", Number)
], PaymentType.prototype, "paymentMethodTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['계좌이체', '카드결제', '숨고페이', '현금결제'],
        unique: true,
    }),
    __metadata("design:type", String)
], PaymentType.prototype, "name", void 0);
exports.PaymentType = PaymentType = __decorate([
    (0, typeorm_1.Entity)('payment_type')
], PaymentType);
//# sourceMappingURL=payment_type.entity.js.map