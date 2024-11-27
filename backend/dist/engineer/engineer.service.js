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
exports.EngineerService = void 0;
const engineer_skill_entity_1 = require("./entities/engineer_skill.entity");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const engineer_entity_1 = require("./entities/engineer.entity");
const customer_engineer_order_entity_1 = require("../order_info/entities/customer_engineer_order.entity");
const DataHandlerFunc_1 = require("../util/DataHandlerFunc");
const engineer_daily_earning_entity_1 = require("./entities/engineer_daily_earning.entity");
const skillUtil_service_1 = require("../skillUtil.service");
const temp_emgineer_info_entity_1 = require("./entities/temp_emgineer_info.entity");
const engineer_weekly_earning_entity_1 = require("./entities/engineer_weekly_earning.entity");
let EngineerService = class EngineerService {
    constructor(skillService, dataSource) {
        this.skillService = skillService;
        this.dataSource = dataSource;
    }
    async createEngineerInfo(engineerData) {
        const queryRunner = this.dataSource.createQueryRunner();
        queryRunner.connect();
        queryRunner.startTransaction();
        try {
            const { engineer_valid_skill, ...engineerWithoutSkill } = engineerData;
            const savedEngineer = await queryRunner.manager.save(engineer_entity_1.Engineer, {
                ...engineerWithoutSkill,
            });
            await queryRunner.manager.save(engineer_entity_1.Engineer, { ...savedEngineer });
            const mappedSkillId = await this.skillService.findSkillIdsByNames(engineer_valid_skill);
            const engineerSkills = mappedSkillId.map((skillId) => ({
                engineer_id: savedEngineer.engineer_id,
                skill_id: skillId,
            }));
            await queryRunner.manager.insert(engineer_skill_entity_1.EngineerSkill, engineerSkills);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
    }
    async findAllEngineer() {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const engineerWithSkills = await queryRunner.manager
                .createQueryBuilder(engineer_skill_entity_1.EngineerSkill, 'engineerSkill')
                .leftJoinAndSelect('engineerSkill.engineer', 'engineer')
                .leftJoinAndSelect('engineerSkill.skill', 'skill')
                .getMany();
            await queryRunner.commitTransaction();
            return await (0, DataHandlerFunc_1.handleEngineerData)(engineerWithSkills);
        }
        catch (error) {
            queryRunner.rollbackTransaction();
            throw error;
        }
    }
    async getAllSchedule() {
        return (0, DataHandlerFunc_1.extractScheduleDetail)(this.dataSource, customer_engineer_order_entity_1.CustomerEngineerOrder);
    }
    async getDailySalary(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const engineerDailyIncome = await queryRunner.manager.find(engineer_daily_earning_entity_1.EngineerDailyEarning, {
                where: {
                    engineer: {
                        engineer_id: id,
                    },
                },
            });
            await queryRunner.commitTransaction();
            return engineerDailyIncome;
        }
        catch (error) {
            throw new common_1.NotFoundException(error);
        }
    }
    async saveEngineerWeeklySalary(weeklySalary) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const isExistingWeekly = await queryRunner.manager.findOne(engineer_weekly_earning_entity_1.EngineerWeeklyEarning, { where: { weekly: weeklySalary.weekly } });
            if (!!isExistingWeekly) {
                await queryRunner.manager.update(engineer_weekly_earning_entity_1.EngineerWeeklyEarning, { weekly: weeklySalary.weekly }, { ...weeklySalary });
            }
            else {
                await queryRunner.manager.save(engineer_weekly_earning_entity_1.EngineerWeeklyEarning, {
                    ...weeklySalary,
                });
            }
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
    }
    async getEngineerWeeklyDetail(idDate) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (!!idDate.engineer_id && !!idDate.weekly) {
                const searchedInfo = await queryRunner.manager.findOne(engineer_weekly_earning_entity_1.EngineerWeeklyEarning, { where: { engineer_id: idDate.engineer_id, weekly: idDate.weekly } });
                await queryRunner.commitTransaction();
                const { idx, ...rest } = searchedInfo;
                return rest;
            }
            else {
                return `${idDate.weekly}에 관련된 정보가 존재하지 않습니다.`;
            }
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
    }
    async findEngineerWithSkill(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const exactEngineer = await queryRunner.manager
                .createQueryBuilder(engineer_skill_entity_1.EngineerSkill, 'engineerSkill')
                .leftJoinAndSelect('engineerSkill.engineer', 'engineer')
                .leftJoinAndSelect('engineerSkill.skill', 'skill')
                .where('engineer.engineer_id = :id', { id })
                .getMany();
            await queryRunner.commitTransaction();
            return await (0, DataHandlerFunc_1.handleEngineerData)(exactEngineer);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateEngineerInfo(id, updateInfo) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const { engineer_valid_skill, ...rest } = updateInfo;
            await queryRunner.manager.update(engineer_entity_1.Engineer, { engineer_id: id }, rest);
            await queryRunner.manager.delete(engineer_skill_entity_1.EngineerSkill, { engineer_id: id });
            const engineerSkill = await this.skillService.findSkillIdsByNames(engineer_valid_skill);
            const newEngineerSkills = engineerSkill.map((skillId) => ({
                engineer_id: id,
                skill_id: skillId,
            }));
            await queryRunner.manager.save(engineer_skill_entity_1.EngineerSkill, newEngineerSkills);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
    }
    async removeEngineerInfo(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const targetEngineer = await queryRunner.manager.findOneOrFail(engineer_entity_1.Engineer, {
                where: { engineer_id: id },
            });
            await queryRunner.manager.save(temp_emgineer_info_entity_1.TempEngineer, { ...targetEngineer });
            await queryRunner.manager.delete(engineer_entity_1.Engineer, { engineer_id: id });
            await queryRunner.manager.query(`
        SELECT setval('engineer_engineer_id_seq', (SELECT MAX(engineer_id) FROM engineer));
      `);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            if (!queryRunner.isReleased) {
                await queryRunner.release();
            }
        }
    }
};
exports.EngineerService = EngineerService;
exports.EngineerService = EngineerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [skillUtil_service_1.SkillService,
        typeorm_1.DataSource])
], EngineerService);
//# sourceMappingURL=engineer.service.js.map