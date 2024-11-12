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
exports.EngineerCommissionRates = void 0;
const typeorm_1 = require("typeorm");
const engineer_entity_1 = require("./engineer.entity");
const commission_rate_entity_1 = require("./commission_rate.entity");
let EngineerCommissionRates = class EngineerCommissionRates {
};
exports.EngineerCommissionRates = EngineerCommissionRates;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'engineer_id' }),
    __metadata("design:type", Number)
], EngineerCommissionRates.prototype, "engineerId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'commission_rate_id' }),
    __metadata("design:type", Number)
], EngineerCommissionRates.prototype, "commissionRateId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => engineer_entity_1.Engineer),
    (0, typeorm_1.JoinColumn)({ name: 'engineer_id' }),
    __metadata("design:type", engineer_entity_1.Engineer)
], EngineerCommissionRates.prototype, "engineer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => commission_rate_entity_1.CommissionRates),
    (0, typeorm_1.JoinColumn)({ name: 'commission_rate_id' }),
    __metadata("design:type", commission_rate_entity_1.CommissionRates)
], EngineerCommissionRates.prototype, "commissionRate", void 0);
exports.EngineerCommissionRates = EngineerCommissionRates = __decorate([
    (0, typeorm_1.Entity)('engineer_commission_rates')
], EngineerCommissionRates);
//# sourceMappingURL=engineer_commission.rate.entity.js.map