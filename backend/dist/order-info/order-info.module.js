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
const order_info_service_1 = require("./order-info.service");
const typeorm_1 = require("@nestjs/typeorm");
const order_info_entity_1 = require("./entities/order_info.entity");
const order_info_controller_1 = require("./order-info.controller");
const orders_pay_entity_1 = require("./entities/orders_pay.entity");
const order_time_entity_1 = require("./entities/order_time.entity");
const calendar_entity_1 = require("./entities/calendar.entity");
const engineer_customer_entity_1 = require("./entities/engineer_customer.entity");
const payment_type_entity_1 = require("./entities/payment_type.entity");
const product_detail_entity_1 = require("./entities/product_detail.entity");
const receipt_type_Entity_1 = require("./entities/receipt_type.Entity");
const product_type_entity_1 = require("./entities/product_type.entity");
const air_condition_entity_1 = require("./entities/air_condition.entity");
const washing_machine_entity_1 = require("./entities/washing_machine.entity");
let OrderInfoModule = class OrderInfoModule {
};
exports.OrderInfoModule = OrderInfoModule;
exports.OrderInfoModule = OrderInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                order_info_entity_1.OrderInfo,
                orders_pay_entity_1.OrdersPay,
                order_time_entity_1.OrderTime,
                calendar_entity_1.Calendar,
                engineer_customer_entity_1.EngineerCustomer,
                payment_type_entity_1.PaymentType,
                product_detail_entity_1.ProductDetail,
                product_type_entity_1.ProductType,
                receipt_type_Entity_1.ReceiptDocs,
                air_condition_entity_1.AirConditioner,
                washing_machine_entity_1.WashingMachine,
            ]),
        ],
        controllers: [order_info_controller_1.OrderInfoController],
        providers: [order_info_service_1.OrderInfoService],
        exports: [typeorm_1.TypeOrmModule],
    })
], OrderInfoModule);
//# sourceMappingURL=order-info.module.js.map