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
exports.OrdersPay = void 0;
const customer_entity_1 = require("../../customer/entities/customer.entity");
const typeorm_1 = require("typeorm");
const payment_type_entity_1 = require("./payment_type.entity");
const receipt_type_Entity_1 = require("./receipt_type.Entity");
let OrdersPay = class OrdersPay {
};
exports.OrdersPay = OrdersPay;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'order_pay_id' }),
    __metadata("design:type", Number)
], OrdersPay.prototype, "orderPayId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    __metadata("design:type", customer_entity_1.Customer)
], OrdersPay.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'decimal', precision: 20, scale: 2 }),
    __metadata("design:type", Number)
], OrdersPay.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deposit_amount', type: 'decimal', precision: 20, scale: 2 }),
    __metadata("design:type", Number)
], OrdersPay.prototype, "depositAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'balance_amount', type: 'decimal', precision: 20, scale: 2 }),
    __metadata("design:type", Number)
], OrdersPay.prototype, "balanceAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount_amount', type: 'decimal', precision: 20, scale: 2 }),
    __metadata("design:type", Number)
], OrdersPay.prototype, "discountAmount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_type_entity_1.PaymentType),
    (0, typeorm_1.JoinColumn)({ name: 'deposit_method_type_id' }),
    __metadata("design:type", payment_type_entity_1.PaymentType)
], OrdersPay.prototype, "depositMethodType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_type_entity_1.PaymentType),
    (0, typeorm_1.JoinColumn)({ name: 'balance_method_type_id' }),
    __metadata("design:type", payment_type_entity_1.PaymentType)
], OrdersPay.prototype, "balanceMethodType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => receipt_type_Entity_1.ReceiptDocs),
    (0, typeorm_1.JoinColumn)({ name: 'deposit_receipt_id' }),
    __metadata("design:type", receipt_type_Entity_1.ReceiptDocs)
], OrdersPay.prototype, "depositReceipt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => receipt_type_Entity_1.ReceiptDocs),
    (0, typeorm_1.JoinColumn)({ name: 'balance_receipt_id' }),
    __metadata("design:type", receipt_type_Entity_1.ReceiptDocs)
], OrdersPay.prototype, "balanceReceipt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'receipt_issued', type: 'boolean' }),
    __metadata("design:type", Boolean)
], OrdersPay.prototype, "receiptIssued", void 0);
exports.OrdersPay = OrdersPay = __decorate([
    (0, typeorm_1.Entity)('orders_pay')
], OrdersPay);
//# sourceMappingURL=orders_pay.entity.js.map