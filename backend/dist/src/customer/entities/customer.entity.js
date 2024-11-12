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
exports.Customer = void 0;
const order_time_entity_1 = require("../../order-info/entities/order_time.entity");
const typeorm_1 = require("typeorm");
let Customer = class Customer {
};
exports.Customer = Customer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'customer_id' }),
    __metadata("design:type", Number)
], Customer.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Customer.prototype, "customerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_number', type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], Customer.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Customer.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'booking_date', type: 'date' }),
    __metadata("design:type", Date)
], Customer.prototype, "bookingDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_time_entity_1.OrderTime),
    (0, typeorm_1.JoinColumn)({ name: 'order_time_id' }),
    __metadata("design:type", order_time_entity_1.OrderTime)
], Customer.prototype, "orderTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "remark", void 0);
exports.Customer = Customer = __decorate([
    (0, typeorm_1.Entity)('customer')
], Customer);
//# sourceMappingURL=customer.entity.js.map