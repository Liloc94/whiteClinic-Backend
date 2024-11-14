"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderInfoModule = void 0;
const common_1 = require("@nestjs/common");
const order_info_service_1 = require("./order_info.service");
const order_info_controller_1 = require("./order_info.controller");
const typeorm_1 = require("@nestjs/typeorm");
const customer_engineer_order_entity_1 = require("./entities/customer_engineer_order.entity");
const order_info_entity_1 = require("./entities/order_info.entity");
const engineer_entity_1 = require("../engineer/entities/engineer.entity");
const customer_entity_1 = require("../customer/entities/customer.entity");
let OrderInfoModule = class OrderInfoModule {
};
exports.OrderInfoModule = OrderInfoModule;
exports.OrderInfoModule = OrderInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                customer_engineer_order_entity_1.CustomerEngineerOrder,
                engineer_entity_1.Engineer,
                order_info_entity_1.Order,
                customer_entity_1.Customer,
            ]),
        ],
        exports: [typeorm_1.TypeOrmModule],
        controllers: [order_info_controller_1.OrderInfoController],
        providers: [order_info_service_1.OrderInfoService],
    })
], OrderInfoModule);
//# sourceMappingURL=order_info.module.js.map