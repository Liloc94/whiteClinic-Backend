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
exports.OrderInfo = void 0;
const customer_entity_1 = require("../../customer/entities/customer.entity");
const typeorm_1 = require("typeorm");
const product_detail_entity_1 = require("./product_detail.entity");
let OrderInfo = class OrderInfo {
};
exports.OrderInfo = OrderInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'order_id' }),
    __metadata("design:type", Number)
], OrderInfo.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    __metadata("design:type", customer_entity_1.Customer)
], OrderInfo.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_detail_entity_1.ProductDetail),
    (0, typeorm_1.JoinColumn)({ name: 'product_detail_id' }),
    __metadata("design:type", product_detail_entity_1.ProductDetail)
], OrderInfo.prototype, "productDetail", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'product_remark',
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], OrderInfo.prototype, "productRemark", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], OrderInfo.prototype, "count", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount_amount', type: 'decimal', precision: 20, scale: 2 }),
    __metadata("design:type", Number)
], OrderInfo.prototype, "discountAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'decimal', precision: 20, scale: 2 }),
    __metadata("design:type", Number)
], OrderInfo.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], OrderInfo.prototype, "remark", void 0);
exports.OrderInfo = OrderInfo = __decorate([
    (0, typeorm_1.Entity)('orders')
], OrderInfo);
//# sourceMappingURL=order_info.entity.js.map