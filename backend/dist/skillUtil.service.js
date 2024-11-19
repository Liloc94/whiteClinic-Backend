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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const skills_entity_1 = require("./engineer/entities/skills.entity");
const typeorm_2 = require("typeorm");
let SkillService = class SkillService {
    constructor(skillRepository) {
        this.skillRepository = skillRepository;
    }
    async findSkillIdsByNames(skillNames) {
        const skills = await this.skillRepository.find({
            where: { skill_type: (0, typeorm_2.In)(skillNames) },
        });
        if (skills.length === 0) {
            throw new common_1.NotFoundException('입력값과 일치하는 품목이 존재하지 않습니다.');
        }
        return skills.map((skill) => skill.skill_id);
    }
};
exports.SkillService = SkillService;
exports.SkillService = SkillService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(skills_entity_1.Skill)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SkillService);
//# sourceMappingURL=skillUtil.service.js.map