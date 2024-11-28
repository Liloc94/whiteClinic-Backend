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
exports.TempEngineer = void 0;
const typeorm_1 = require("typeorm");
let TempEngineer = class TempEngineer {
};
exports.TempEngineer = TempEngineer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TempEngineer.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TempEngineer.prototype, "engineer_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TempEngineer.prototype, "engineer_phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TempEngineer.prototype, "engineer_addr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TempEngineer.prototype, "engineer_remark", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TempEngineer.prototype, "engineer_commission", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TempEngineer.prototype, "engineer_dayoff", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], TempEngineer.prototype, "engineer_holiday", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TempEngineer.prototype, "engineer_payday", void 0);
exports.TempEngineer = TempEngineer = __decorate([
    (0, typeorm_1.Entity)('temp_engineer_info')
], TempEngineer);
//# sourceMappingURL=temp_emgineer_info.entity.js.map