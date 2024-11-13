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
exports.EngineerDailyEarning = void 0;
const typeorm_1 = require("typeorm");
const engineer_entity_1 = require("./engineer.entity");
const order_info_entity_1 = require("../../order_info/entities/order_info.entity");
let EngineerDailyEarning = class EngineerDailyEarning {
};
exports.EngineerDailyEarning = EngineerDailyEarning;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], EngineerDailyEarning.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_info_entity_1.Order, (order) => order.order_id),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", order_info_entity_1.Order)
], EngineerDailyEarning.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => engineer_entity_1.Engineer),
    (0, typeorm_1.JoinColumn)({ name: 'engineer_id' }),
    __metadata("design:type", engineer_entity_1.Engineer)
], EngineerDailyEarning.prototype, "engineer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], EngineerDailyEarning.prototype, "daily_income", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], EngineerDailyEarning.prototype, "date", void 0);
exports.EngineerDailyEarning = EngineerDailyEarning = __decorate([
    (0, typeorm_1.Entity)('engineer_daily_earning')
], EngineerDailyEarning);
//# sourceMappingURL=engineer_daily_earning.entity.js.map