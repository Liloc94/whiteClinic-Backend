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
const customer_engineer_order_entity_1 = require("../order_info/entities/customer_engineer_order.entity");
const DataHandlerFunc_1 = require("../util/DataHandlerFunc");
const engineer_daily_earning_entity_1 = require("./entities/engineer_daily_earning.entity");
let EngineerService = class EngineerService {
    constructor(engineerRepository, skillRepository, engineerSkillRepository, orderDetailRepository, engineerDailyEarningRepository) {
        this.engineerRepository = engineerRepository;
        this.skillRepository = skillRepository;
        this.engineerSkillRepository = engineerSkillRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.engineerDailyEarningRepository = engineerDailyEarningRepository;
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
            const mappedSkillId = await (0, DataHandlerFunc_1.findSkillIdsByNames)(engineer_valid_skill);
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
        const engineerWithSkills = await this.engineerSkillRepository
            .createQueryBuilder('engineerSkill')
            .leftJoinAndSelect('engineerSkill.engineer', 'engineer')
            .leftJoinAndSelect('engineerSkill.skill', 'skill')
            .getMany();
        if (!engineerWithSkills[0]) {
            throw new common_1.NotFoundException('기사 정보가 존재하지 않습니다.');
        }
        return await (0, DataHandlerFunc_1.handleEngineerData)(engineerWithSkills);
    }
    async getAllSchedule() {
        const engineerSchedule = await this.orderDetailRepository
            .createQueryBuilder('customerEngineerOrder')
            .leftJoinAndSelect('customerEngineerOrder.customer', 'customer')
            .leftJoinAndSelect('customerEngineerOrder.engineer', 'engineer')
            .leftJoinAndSelect('customerEngineerOrder.order', 'order')
            .getMany();
        if (!engineerSchedule[0]) {
            throw new common_1.NotFoundException('기사 스케쥴 데이터가 존재하지 않습니다.');
        }
        return await (0, DataHandlerFunc_1.handleEngineerScheduleData)(engineerSchedule);
    }
    async getDailySalary() {
        const dailySalaryTest = await this.engineerDailyEarningRepository.find({
            relations: ['engineer', 'order'],
        });
        return dailySalaryTest;
    }
    async findOne(id) {
        const exactEngineer = await this.engineerRepository.find({
            where: { engineer_id: id },
        });
        if (exactEngineer.length == 0) {
            throw new common_1.NotFoundException(`ID : #${id}를 갖는 기사정보가 존재하지 않습니다.`);
        }
        return exactEngineer;
    }
    async update(id, updateEngineerDto) {
        return `This action updates a #${id} engineer with ${{ ...updateEngineerDto }}`;
    }
    async remove(id) {
        return `This action removes a id : #${id} engineer`;
    }
};
exports.EngineerService = EngineerService;
exports.EngineerService = EngineerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(engineer_entity_1.Engineer)),
    __param(1, (0, typeorm_2.InjectRepository)(skills_entity_1.Skill)),
    __param(2, (0, typeorm_2.InjectRepository)(engineer_skill_entity_1.EngineerSkill)),
    __param(3, (0, typeorm_2.InjectRepository)(customer_engineer_order_entity_1.CustomerEngineerOrder)),
    __param(4, (0, typeorm_2.InjectRepository)(engineer_daily_earning_entity_1.EngineerDailyEarning)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], EngineerService);
//# sourceMappingURL=engineer.service.js.map