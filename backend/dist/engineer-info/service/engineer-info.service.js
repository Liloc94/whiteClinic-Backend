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
exports.EngineerInfoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const engineer_entity_1 = require("../entities/engineer.entity");
const typeorm_2 = require("typeorm");
const engineer_daily_earnings_entity_1 = require("../entities/engineer_daily_earnings.entity");
const engineer_payday_entity_1 = require("../entities/engineer_payday.entity");
const engineer_commission_rate_entity_1 = require("../entities/engineer_commission.rate.entity");
let EngineerInfoService = class EngineerInfoService {
    constructor(EngineerRepository, engineerDailyearningsReopsitory, EngineerPayDayRepository, EngineerCommissionRatesRepository) {
        this.EngineerRepository = EngineerRepository;
        this.engineerDailyearningsReopsitory = engineerDailyearningsReopsitory;
        this.EngineerPayDayRepository = EngineerPayDayRepository;
        this.EngineerCommissionRatesRepository = EngineerCommissionRatesRepository;
    }
    async engineer() {
        const engineerData = await this.EngineerRepository.find();
        console.log(engineerData);
        return engineerData;
    }
    async enginnerPay() {
        const engineerPay = await this.engineerDailyearningsReopsitory.find();
        console.log(engineerPay);
        return engineerPay;
    }
    async engineerPayDay() {
        const engineerPayDay = await this.EngineerPayDayRepository.find();
        return engineerPayDay.map(this.dayToName);
    }
    dayToName(payDay) {
        const dayNames = [
            '월요일',
            '화요일',
            '수요일',
            '목요일',
            '금요일',
            '토요일',
            '일요일',
        ];
        const dayName = dayNames[payDay.weekday.id - 1] || '없음';
        return {
            ...payDay,
            weekdays: dayName,
        };
    }
    async engineerCommissionRates() {
        const engineerCommissionRates = await this.EngineerCommissionRatesRepository.find();
        console.log(engineerCommissionRates);
        return engineerCommissionRates.map(this.RatesToFilter);
    }
    RatesToFilter(rate) {
        const rateArray = [50, 55, 60, 65, 70, 75, 80];
        const resultRate = rateArray[rate.commissionRateId - 1] || '없음';
        return {
            ...rate,
            rateId: resultRate,
        };
    }
};
exports.EngineerInfoService = EngineerInfoService;
exports.EngineerInfoService = EngineerInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(engineer_entity_1.Engineer)),
    __param(1, (0, typeorm_1.InjectRepository)(engineer_daily_earnings_entity_1.EngineerDailyEarnings)),
    __param(2, (0, typeorm_1.InjectRepository)(engineer_payday_entity_1.EngineerPayday)),
    __param(3, (0, typeorm_1.InjectRepository)(engineer_commission_rate_entity_1.EngineerCommissionRates)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EngineerInfoService);
//# sourceMappingURL=engineer-info.service.js.map