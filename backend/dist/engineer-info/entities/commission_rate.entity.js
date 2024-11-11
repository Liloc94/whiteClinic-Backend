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
exports.CommissionRates = void 0;
const typeorm_1 = require("typeorm");
let CommissionRates = class CommissionRates {
};
exports.CommissionRates = CommissionRates;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'commission_rate_id' }),
    __metadata("design:type", Number)
], CommissionRates.prototype, "commissionRateId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['50%', '55%', '60%', '65%', '70%', '75%', '80%'],
        unique: true,
    }),
    __metadata("design:type", String)
], CommissionRates.prototype, "rate", void 0);
exports.CommissionRates = CommissionRates = __decorate([
    (0, typeorm_1.Entity)('commission_rates')
], CommissionRates);
//# sourceMappingURL=commission_rate.entity.js.map