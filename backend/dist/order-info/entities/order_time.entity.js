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
exports.OrderTime = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let OrderTime = class OrderTime {
};
exports.OrderTime = OrderTime;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'order_time_id' }),
    __metadata("design:type", Number)
], OrderTime.prototype, "orderTimeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({
        enum: [
            '8시 이전',
            '08:00 ~ 09:00',
            '09:00 ~ 10:00',
            '10:00 ~ 11:00',
            '11:00 ~ 12:00',
            '12:00 ~ 13:00',
            '13:00 ~ 14:00',
            '14:00 ~ 15:00',
            '15:00 ~ 16:00',
            '16:00 ~ 17:00',
            '17:00 ~ 18:00',
            '18:00 ~ 19:00',
            '19시 이후',
        ],
    }),
    __metadata("design:type", String)
], OrderTime.prototype, "orderTimeSlot", void 0);
exports.OrderTime = OrderTime = __decorate([
    (0, typeorm_1.Entity)('order_time')
], OrderTime);
//# sourceMappingURL=order_time.entity.js.map