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
exports.IncomeInfoService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const engineer_weekly_earning_entity_1 = require("./engineer/entities/engineer_weekly_earning.entity");
const typeorm_2 = require("@nestjs/typeorm");
const engineer_daily_earning_entity_1 = require("./engineer/entities/engineer_daily_earning.entity");
let IncomeInfoService = class IncomeInfoService {
    constructor(weeklyEarningRepository, dailyEarningRepository, dataSource) {
        this.weeklyEarningRepository = weeklyEarningRepository;
        this.dailyEarningRepository = dailyEarningRepository;
        this.dataSource = dataSource;
    }
    async saveDailyIncome(incomeData) {
        const queryRunner = this.dataSource.createQueryRunner();
        queryRunner.connect();
        queryRunner.startTransaction();
        try {
            await queryRunner.manager.save(engineer_daily_earning_entity_1.EngineerDailyEarning, {
                daily_income: incomeData.daily_income,
                date: incomeData.date,
                order: { order_id: incomeData.order_id },
                engineer: { engineer_id: incomeData.engineer_id },
            });
            queryRunner.commitTransaction();
        }
        catch (error) {
            queryRunner.rollbackTransaction();
            throw error;
        }
    }
};
exports.IncomeInfoService = IncomeInfoService;
exports.IncomeInfoService = IncomeInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(engineer_weekly_earning_entity_1.EngineerWeeklyEarning)),
    __param(1, (0, typeorm_2.InjectRepository)(engineer_daily_earning_entity_1.EngineerDailyEarning)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.DataSource])
], IncomeInfoService);
//# sourceMappingURL=income.service.js.map