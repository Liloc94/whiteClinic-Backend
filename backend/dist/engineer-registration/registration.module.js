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
const Skills_entity_1 = require("./entities/Skills.entity");
const EngineerSkill_entity_1 = require("./entities/EngineerSkill.entity");
const SpecialHolidays_entity_1 = require("./entities/SpecialHolidays.entity");
const WeekDays_entity_1 = require("./entities/WeekDays.entity");
const RegularHolidays_entity_1 = require("./entities/RegularHolidays.entity");
let RegistrationModule = class RegistrationModule {
};
exports.RegistrationModule = RegistrationModule;
exports.RegistrationModule = RegistrationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                engineer_entity_1.Engineer,
                Skills_entity_1.Skills,
                EngineerSkill_entity_1.EngineerSkill,
                SpecialHolidays_entity_1.SpecialHolidays,
                WeekDays_entity_1.WeekDays,
                RegularHolidays_entity_1.RegularHolidays,
            ]),
        ],
        controllers: [registration_controller_1.RegistrationController],
        providers: [registration_service_1.RegistrationService],
    })
], RegistrationModule);
//# sourceMappingURL=registration.module.js.map