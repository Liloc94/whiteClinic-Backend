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
exports.SubmitOrder = void 0;
const typeorm_1 = require("typeorm");
let SubmitOrder = class SubmitOrder {
};
exports.SubmitOrder = SubmitOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SubmitOrder.prototype, "order_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], SubmitOrder.prototype, "order_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, type: 'varchar' }),
    __metadata("design:type", String)
], SubmitOrder.prototype, "customer_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, type: 'varchar' }),
    __metadata("design:type", String)
], SubmitOrder.prototype, "customer_contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, type: 'varchar' }),
    __metadata("design:type", String)
], SubmitOrder.prototype, "customer_addr", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SubmitOrder.prototype, "customer_remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, type: 'boolean' }),
    __metadata("design:type", Boolean)
], SubmitOrder.prototype, "isPayed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], SubmitOrder.prototype, "bookingFee", void 0);
__decorate([
    (0, typeorm_1.Column)({
        enum: ['계좌이체', '카드결제', '숨고페이', '현금결제'],
        unique: true,
    }),
    __metadata("design:type", String)
], SubmitOrder.prototype, "paymentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, type: 'boolean' }),
    __metadata("design:type", Boolean)
], SubmitOrder.prototype, "isIssued", void 0);
exports.SubmitOrder = SubmitOrder = __decorate([
    (0, typeorm_1.Entity)('submit-order')
], SubmitOrder);
//# sourceMappingURL=submit_order.entity.js.map