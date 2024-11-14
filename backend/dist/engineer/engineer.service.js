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
let EngineerService = class EngineerService {
    constructor(engineerRepository, skillRepository, engineerSkillRepository, orderDetailRepository) {
        this.engineerRepository = engineerRepository;
        this.skillRepository = skillRepository;
        this.engineerSkillRepository = engineerSkillRepository;
        this.orderDetailRepository = orderDetailRepository;
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
        const engineerWithSkills = await this.engineerSkillRepository
            .createQueryBuilder('engineerSkill')
            .leftJoinAndSelect('engineerSkill.engineer', 'engineer')
            .leftJoinAndSelect('engineerSkill.skill', 'skill')
            .getMany();
        const engineerMap = new Map();
        engineerWithSkills.forEach((engineerSkill) => {
            const { engineer, skill } = engineerSkill;
            if (engineerMap.has(engineer.engineer_id)) {
                engineerMap
                    .get(engineer.engineer_id)
                    .engineer_skills.push(skill.skill_type);
            }
            else {
                engineerMap.set(engineer.engineer_id, {
                    ...engineer,
                    engineer_skills: [skill.skill_type],
                });
            }
        });
        return Array.from(engineerMap.values());
    }
    async getAllSchedule() {
        const engineerSchedule = await this.orderDetailRepository
            .createQueryBuilder('customerEngineerOrder')
            .leftJoinAndSelect('customerEngineerOrder.customer', 'customer')
            .leftJoinAndSelect('customerEngineerOrder.engineer', 'engineer')
            .leftJoinAndSelect('customerEngineerOrder.order', 'order')
            .getMany();
        async function handleOrderDetails(orderDetails) {
            const scheduleList = orderDetails.map((detail) => {
                const { customer, engineer, order } = detail;
                return {
                    order_id: order.order_id,
                    engineer_id: engineer.engineer_id,
                    customer_id: customer.customer_id,
                    order_date: order.order_date,
                    order_timeslot: '',
                    engineer_name: engineer.engineer_name,
                    customer_name: customer.customer_name,
                    customer_addr: customer.customer_addr,
                    customer_phone: customer.customer_phone,
                    order_product: order.order_category,
                    order_product_detail: order.order_product,
                    order_count: order.order_count,
                    order_total_amount: order.order_total_amount,
                    order_remarks: order.order_remark,
                    customer_remarks: customer.customer_remark,
                };
            });
            return scheduleList;
        }
        return await handleOrderDetails(engineerSchedule);
    }
    findOne(id) {
        return `This action returns a #${id} engineer`;
    }
    update(id, updateEngineerDto) {
        return `This action updates a #${id} engineer with ${updateEngineerDto}`;
    }
    remove(id) {
        return `This action removes a id : #${id} engineer`;
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
    __param(3, (0, typeorm_2.InjectRepository)(customer_engineer_order_entity_1.CustomerEngineerOrder)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], EngineerService);
//# sourceMappingURL=engineer.service.js.map