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
exports.RegistrationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const engineer_info_entity_1 = require("../../engineer-info/entities/engineer-info.entity");
const typeorm_2 = require("typeorm");
const skill_entity_1 = require("../entities/skill.entity");
const engineer_commissionRates_entity_1 = require("../../engineer-info/entities/engineer-commissionRates.entity");
const commissionRates_entity_1 = require("../entities/commissionRates.entity");
const specialHolidays_entity_1 = require("../entities/specialHolidays.entity");
const reaularHolidays_entity_1 = require("../entities/reaularHolidays.entity");
const weekDay_entity_1 = require("../entities/weekDay.entity");
const engineer_payDay_entity_1 = require("../../engineer-info/entities/engineer-payDay.entity");
const Engineer_skill_entity_1 = require("../entities/Engineer_skill.entity");
let RegistrationService = class RegistrationService {
    constructor(dataSource, EngineerRepostiory) {
        this.dataSource = dataSource;
        this.EngineerRepostiory = EngineerRepostiory;
    }
    async create(dto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const engineer = this.EngineerRepostiory.save({
                name: dto.engineerName,
                phoneNumber: dto.phoneNumber,
                location: dto.location,
                remark: dto.remark,
            });
            console.log('engineerData 정상적으로 저장완료', (await engineer).name);
            const skillNames = dto.skill.split(',').map((data) => data.trim());
            for (const skillName of skillNames) {
                let skill = await queryRunner.manager.findOne(skill_entity_1.Skill, {
                    where: { skill: skillName },
                });
                if (!skill) {
                    skill = await queryRunner.manager.save(skill_entity_1.Skill, {
                        skill: skillName,
                    });
                    console.log('새로운 스킬인 ' + skill.skill + ' 저장되었습니다.');
                }
                await queryRunner.manager.save(Engineer_skill_entity_1.EngineerSkill, {
                    engineerId: (await engineer).id,
                    skillId: skill.id,
                });
                console.log('engineerId : ', (await engineer).id);
                console.log('skillId', skill.id);
            }
            const CommissionRate = await queryRunner.manager.findOneBy(commissionRates_entity_1.CommissionRates, {
                rate: parseFloat(dto.commissionRate),
            });
            await queryRunner.manager.save(engineer_commissionRates_entity_1.EngineerCommissionRates, {
                engineerId: (await engineer).id,
                rateId: CommissionRate.id,
            });
            const ArraySPecialHolidays = dto.specialHoliday
                .split(',')
                .map((data) => data.trim());
            for (const ArraySPecialHoliday of ArraySPecialHolidays) {
                await queryRunner.manager.save(specialHolidays_entity_1.SpecialHolidays, {
                    engineerId: (await engineer).id,
                    holiday: ArraySPecialHoliday,
                });
            }
            console.log('비정기 완료', ArraySPecialHolidays);
            const selectedDayId = await queryRunner.manager.findOneBy(weekDay_entity_1.WeekDays, {
                dayName: dto.regularHoliday,
            });
            await queryRunner.manager.save(reaularHolidays_entity_1.RegularHolidays, {
                engineerId: (await engineer).id,
                weekdayId: selectedDayId.id,
            });
            console.log('정기휴무 나오냐?', selectedDayId);
            const selectPaymentDay = await queryRunner.manager.findOneBy(weekDay_entity_1.WeekDays, {
                dayName: dto.paymentDay,
            });
            await queryRunner.manager.save(engineer_payDay_entity_1.EngineerPayDay, {
                engineerId: (await engineer).id,
                weekdays: selectPaymentDay.id,
                isPay: false,
            });
            console.log('급여요일 날짜 나오냐?', selectPaymentDay.id);
            await queryRunner.commitTransaction();
            return {
                sucess: true,
                message: '성공적으로 데이터가 저장되었습니다.',
                data: {
                    engineer,
                    skillNames: skillNames,
                    commissionRate: CommissionRate,
                    specialHolidays: ArraySPecialHolidays,
                    regularHolidays: selectedDayId,
                    paymentDay: selectPaymentDay,
                },
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('에러 발생', error);
        }
        finally {
            await queryRunner.release();
        }
    }
    update(id, updateRegistrationDto) {
        return `This action updates a #${id} registration`;
    }
    remove(id) {
        return `This action removes a #${id} registration`;
    }
};
exports.RegistrationService = RegistrationService;
exports.RegistrationService = RegistrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(engineer_info_entity_1.Engineer)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], RegistrationService);
//# sourceMappingURL=registration.service.js.map