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
exports.CustomerData = void 0;
const typeorm_1 = require("typeorm");
const order_time_entity_1 = require("../../order-info/entities/order_time.entity");
let CustomerData = class CustomerData {
};
exports.CustomerData = CustomerData;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CustomerData.prototype, "customerInfoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: false }),
    __metadata("design:type", String)
], CustomerData.prototype, "customerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", Number)
], CustomerData.prototype, "customerPhoneNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], CustomerData.prototype, "customerAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Date)
], CustomerData.prototype, "customerBookingDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_time_entity_1.OrderTime, (orderTime) => orderTime.orderTimeId),
    (0, typeorm_1.JoinColumn)({ name: 'order-time-id' }),
    __metadata("design:type", Array)
], CustomerData.prototype, "orderTimeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], CustomerData.prototype, "remark", void 0);
exports.CustomerData = CustomerData = __decorate([
    (0, typeorm_1.Entity)({ name: 'customer-info' })
], CustomerData);
//# sourceMappingURL=create-customer.entity.js.map