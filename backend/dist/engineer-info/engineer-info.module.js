"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineerInfoModule = void 0;
const common_1 = require("@nestjs/common");
const engineer_info_controller_1 = require("./controller/engineer-info.controller");
const engineer_info_service_1 = require("./service/engineer-info.service");
const typeorm_1 = require("@nestjs/typeorm");
const engineer_entity_1 = require("./entities/engineer.entity");
const engineer_commission_rate_entity_1 = require("./entities/engineer_commission.rate.entity");
const engineer_daily_earnings_entity_1 = require("./entities/engineer_daily_earnings.entity");
const engineer_payday_entity_1 = require("./entities/engineer_payday.entity");
const commission_rate_entity_1 = require("./entities/commission_rate.entity");
const engineer_day_off_entity_1 = require("./entities/engineer_day_off.entity");
const engineer_skill_remark_entity_1 = require("./entities/engineer_skill_remark.entity");
const engineer_weely_earnings_entity_1 = require("./entities/engineer_weely_earnings.entity");
let EngineerInfoModule = class EngineerInfoModule {
};
exports.EngineerInfoModule = EngineerInfoModule;
exports.EngineerInfoModule = EngineerInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                engineer_entity_1.Engineer,
                engineer_daily_earnings_entity_1.EngineerDailyEarnings,
                engineer_payday_entity_1.EngineerPayday,
                engineer_commission_rate_entity_1.EngineerCommissionRates,
                commission_rate_entity_1.CommissionRates,
                engineer_day_off_entity_1.EngineerDayoff,
                engineer_skill_remark_entity_1.EngineerSkillRemark,
                engineer_weely_earnings_entity_1.EngineerWeeklyEarnings,
            ]),
        ],
        controllers: [engineer_info_controller_1.EngineerInfoController],
        providers: [engineer_info_service_1.EngineerInfoService],
    })
], EngineerInfoModule);
//# sourceMappingURL=engineer-info.module.js.map