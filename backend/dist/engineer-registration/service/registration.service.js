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
const engineer_entity_1 = require("../../engineer-info/entities/engineer.entity");
const typeorm_2 = require("typeorm");
const engineer_commission_rate_entity_1 = require("../../engineer-info/entities/engineer_commission.rate.entity");
const commissionRates_entity_1 = require("../entities/commissionRates.entity");
const RegularHolidays_entity_1 = require("../entities/RegularHolidays.entity");
const WeekDays_entity_1 = require("../entities/WeekDays.entity");
const EngineerSkill_entity_1 = require("../entities/EngineerSkill.entity");
const Skills_entity_1 = require("../entities/Skills.entity");
const engineer_payday_entity_1 = require("../../engineer-info/entities/engineer_payday.entity");
const special_holidays_entity_1 = require("../entities/special_holidays.entity");
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
                let skill = await queryRunner.manager.findOne(Skills_entity_1.Skills, {
                    where: { skill: skillName },
                });
                if (!skill) {
                    skill = await queryRunner.manager.save(Skills_entity_1.Skills, {
                        skill: skillName,
                    });
                    console.log('새로운 스킬인 ' + skill.skill + ' 저장되었습니다.');
                }
                await queryRunner.manager.save(EngineerSkill_entity_1.EngineerSkill, {
                    engineerId: (await engineer).engineerId,
                    skillId: skill.skillId,
                });
                console.log('engineerId : ', (await engineer).engineerId);
                console.log('skillId', skill.skillId);
            }
            const CommissionRate = await queryRunner.manager.findOneBy(commissionRates_entity_1.CommissionRates, {
                rate: parseFloat(dto.commissionRate),
            });
            await queryRunner.manager.save(engineer_commission_rate_entity_1.EngineerCommissionRates, {
                engineerId: (await engineer).engineerId,
                rateId: CommissionRate.id,
            });
            const ArraySPecialHolidays = dto.specialHoliday
                .split(',')
                .map((data) => data.trim());
            for (const ArraySPecialHoliday of ArraySPecialHolidays) {
                await queryRunner.manager.save(special_holidays_entity_1.SpecialHolidays, {
                    engineerId: (await engineer).engineerId,
                    holiday: ArraySPecialHoliday,
                });
            }
            console.log('비정기 완료', ArraySPecialHolidays);
            const selectedDayId = await queryRunner.manager.findOneBy(WeekDays_entity_1.WeekDays, {
                dayName: dto.regularHoliday,
            });
            await queryRunner.manager.save(RegularHolidays_entity_1.RegularHolidays, {
                engineerId: (await engineer).engineerId,
                weekdayId: selectedDayId.id,
            });
            console.log('정기휴무 나오냐?', selectedDayId);
            const selectPaymentDay = await queryRunner.manager.findOneBy(WeekDays_entity_1.WeekDays, {
                dayName: dto.paymentDay,
            });
            await queryRunner.manager.save(engineer_payday_entity_1.EngineerPayday, {
                engineerId: (await engineer).engineerId,
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
    update(id, UpdateRegistrationDto) {
        return `This action updates a #${id} registration`;
    }
    remove(id) {
        return `This action removes a #${id} registration`;
    }
};
exports.RegistrationService = RegistrationService;
exports.RegistrationService = RegistrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(engineer_entity_1.Engineer)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], RegistrationService);
//# sourceMappingURL=registration.service.js.map