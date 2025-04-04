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
exports.CustomerEngineerOrder = void 0;
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("./customer.entity");
const order_info_entity_1 = require("../../order/entities/order_info.entity");
const engineer_entity_1 = require("../../engineer/entities/engineer.entity");
let CustomerEngineerOrder = class CustomerEngineerOrder {
};
exports.CustomerEngineerOrder = CustomerEngineerOrder;
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.customer_id),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    __metadata("design:type", Array)
], CustomerEngineerOrder.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_info_entity_1.Order, (order) => order.order_id),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", Array)
], CustomerEngineerOrder.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => engineer_entity_1.Engineer, (engineer) => engineer.engineer_id),
    (0, typeorm_1.JoinColumn)({ name: 'engineer_id' }),
    __metadata("design:type", Array)
], CustomerEngineerOrder.prototype, "engineer", void 0);
exports.CustomerEngineerOrder = CustomerEngineerOrder = __decorate([
    (0, typeorm_1.Entity)('customer_engineer_order', { name: 'customer_engineer_order' })
], CustomerEngineerOrder);
//# sourceMappingURL=customer_engineer_order.entity.js.map