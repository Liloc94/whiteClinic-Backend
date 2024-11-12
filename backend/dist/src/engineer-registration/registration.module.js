"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationModule = void 0;
const common_1 = require("@nestjs/common");
const registration_service_1 = require("./service/registration.service");
const registration_controller_1 = require("./controller/registration.controller");
const typeorm_1 = require("@nestjs/typeorm");
const engineer_entity_1 = require("../engineer-info/entities/engineer.entity");
const skills_entity_1 = require("./entities/skills.entity");
const enginner_skill_entity_1 = require("./entities/enginner_skill.entity");
const special_holidays_entity_1 = require("./entities/special_holidays.entity");
const weekdays_entity_1 = require("./entities/weekdays.entity");
const regular_holiday_entity_1 = require("./entities/regular_holiday.entity");
const commission_rate_entity_1 = require("./entities/commission_rate.entity");
let RegistrationModule = class RegistrationModule {
};
exports.RegistrationModule = RegistrationModule;
exports.RegistrationModule = RegistrationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                engineer_entity_1.Engineer,
                skills_entity_1.Skills,
                commission_rate_entity_1.CommissionRates,
                enginner_skill_entity_1.EngineerSkill,
                special_holidays_entity_1.SpecialHolidays,
                weekdays_entity_1.WeekDays,
                regular_holiday_entity_1.RegularHolidays,
            ]),
        ],
        controllers: [registration_controller_1.RegistrationController],
        providers: [registration_service_1.RegistrationService],
    })
], RegistrationModule);
//# sourceMappingURL=registration.module.js.map