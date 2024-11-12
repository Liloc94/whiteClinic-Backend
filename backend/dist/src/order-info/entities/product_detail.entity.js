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
exports.ProductDetail = void 0;
const typeorm_1 = require("typeorm");
const product_type_entity_1 = require("./product_type.entity");
const air_condition_entity_1 = require("./air_condition.entity");
const washing_machine_entity_1 = require("./washing_machine.entity");
let ProductDetail = class ProductDetail {
};
exports.ProductDetail = ProductDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'product_detail_id' }),
    __metadata("design:type", Number)
], ProductDetail.prototype, "productDetailId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_type_id' }),
    __metadata("design:type", Number)
], ProductDetail.prototype, "productTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_type_entity_1.ProductType),
    (0, typeorm_1.JoinColumn)({ name: 'product_type_id' }),
    __metadata("design:type", product_type_entity_1.ProductType)
], ProductDetail.prototype, "productType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'air_condition_id', nullable: true }),
    __metadata("design:type", Number)
], ProductDetail.prototype, "airConditionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => air_condition_entity_1.AirConditioner),
    (0, typeorm_1.JoinColumn)({ name: 'air_condition_id' }),
    __metadata("design:type", air_condition_entity_1.AirConditioner)
], ProductDetail.prototype, "airCondition", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'washing_machine_id', nullable: true }),
    __metadata("design:type", Number)
], ProductDetail.prototype, "washingMachineId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => washing_machine_entity_1.WashingMachine),
    (0, typeorm_1.JoinColumn)({ name: 'washing_machine_id' }),
    __metadata("design:type", washing_machine_entity_1.WashingMachine)
], ProductDetail.prototype, "washingMachine", void 0);
exports.ProductDetail = ProductDetail = __decorate([
    (0, typeorm_1.Entity)('product_details'),
    (0, typeorm_1.Check)(`
  (product_type_id = 1 AND air_condition_id IS NOT NULL AND washing_machine_id IS NULL) OR
  (product_type_id = 2 AND washing_machine_id IS NOT NULL AND air_condition_id IS NULL)
`)
], ProductDetail);
//# sourceMappingURL=product_detail.entity.js.map