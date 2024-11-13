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
exports.EngineerService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const engineer_entity_1 = require("./entities/engineer.entity");
const typeorm_2 = require("@nestjs/typeorm");
const skills_entity_1 = require("./entities/skills.entity");
const engineer_skill_entity_1 = require("./entities/engineer_skill.entity");
let EngineerService = class EngineerService {
    constructor(engineerRepository, skillRepository, engineerSkillRepository) {
        this.engineerRepository = engineerRepository;
        this.skillRepository = skillRepository;
        this.engineerSkillRepository = engineerSkillRepository;
    }
    async create(engineerData) {
        try {
            if (!engineerData) {
                throw new common_1.BadRequestException('저장할 기사 정보가 존재하지 않습니다');
            }
            const { engineer_valid_skill, ...engineerWithoutSkill } = engineerData;
            const savedEngineer = await this.engineerRepository.save({
                ...engineerWithoutSkill,
            });
            await this.engineerRepository.save({ ...savedEngineer });
            const mappedSkillId = await this.findSkillIdsByNames(engineer_valid_skill);
            await this.engineerRepository.find({
                select: ['engineer_id'],
                order: { engineer_id: 'DESC' },
            });
            const engineerSkills = mappedSkillId.map((skillId) => ({
                engineer_id: savedEngineer.engineer_id,
                skill_id: skillId,
            }));
            await this.engineerSkillRepository.insert(engineerSkills);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('이미 존재하는 엔지니어입니다.');
            }
        }
    }
    async findAll() {
        return await this.engineerRepository.find();
    }
    findOne(id) {
        return `This action returns a #${id} engineer`;
    }
    update(id, updateEngineerDto) {
        return `This action updates a #${id} engineer with ${updateEngineerDto}`;
    }
    remove(id) {
        return `This action removes a #${id} engineer`;
    }
    async findSkillIdsByNames(skillNames) {
        const skills = await this.skillRepository.find({
            where: { skill_type: (0, typeorm_1.In)(skillNames) },
        });
        if (skills.length === 0) {
            throw new Error('입력값과 일치하는 품목이 존재하지 않습니다.');
        }
        return skills.map((skill) => skill.skill_id);
    }
};
exports.EngineerService = EngineerService;
exports.EngineerService = EngineerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(engineer_entity_1.Engineer)),
    __param(1, (0, typeorm_2.InjectRepository)(skills_entity_1.Skill)),
    __param(2, (0, typeorm_2.InjectRepository)(engineer_skill_entity_1.EngineerSkill)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], EngineerService);
//# sourceMappingURL=engineer.service.js.map