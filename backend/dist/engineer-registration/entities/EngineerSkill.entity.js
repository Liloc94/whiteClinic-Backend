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
exports.EngineerSkill = void 0;
const engineer_entity_1 = require("../../engineer-info/entities/engineer.entity");
const typeorm_1 = require("typeorm");
const Skills_entity_1 = require("./Skills.entity");
let EngineerSkill = class EngineerSkill {
};
exports.EngineerSkill = EngineerSkill;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'engineer_id' }),
    __metadata("design:type", Number)
], EngineerSkill.prototype, "engineerId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'skill_id' }),
    __metadata("design:type", Number)
], EngineerSkill.prototype, "skillId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => engineer_entity_1.Engineer),
    (0, typeorm_1.JoinColumn)({ name: 'engineer_id' }),
    __metadata("design:type", engineer_entity_1.Engineer)
], EngineerSkill.prototype, "engineer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Skills_entity_1.Skills),
    (0, typeorm_1.JoinColumn)({ name: 'skill_id' }),
    __metadata("design:type", Skills_entity_1.Skills)
], EngineerSkill.prototype, "skill", void 0);
exports.EngineerSkill = EngineerSkill = __decorate([
    (0, typeorm_1.Entity)('engineer_skill')
], EngineerSkill);
//# sourceMappingURL=EngineerSkill.entity.js.map