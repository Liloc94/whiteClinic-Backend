"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineerModule = void 0;
const common_1 = require("@nestjs/common");
const engineer_service_1 = require("./engineer.service");
const engineer_controller_1 = require("./engineer.controller");
const typeorm_1 = require("@nestjs/typeorm");
const engineer_daily_earning_entity_1 = require("./entities/engineer_daily_earning.entity");
const engineer_entity_1 = require("./entities/engineer.entity");
const engineer_skill_entity_1 = require("./entities/engineer_skill.entity");
const skills_entity_1 = require("./entities/skills.entity");
const order_info_entity_1 = require("../order_info/entities/order_info.entity");
const customer_engineer_order_entity_1 = require("../order_info/entities/customer_engineer_order.entity");
const skillUtil_service_1 = require("../skillUtil.service");
const engineer_weekly_earning_entity_1 = require("./entities/engineer_weekly_earning.entity");
let EngineerModule = class EngineerModule {
};
exports.EngineerModule = EngineerModule;
exports.EngineerModule = EngineerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                customer_engineer_order_entity_1.CustomerEngineerOrder,
                engineer_daily_earning_entity_1.EngineerDailyEarning,
                engineer_weekly_earning_entity_1.EngineerWeeklyEarning,
                engineer_entity_1.Engineer,
                engineer_skill_entity_1.EngineerSkill,
                skills_entity_1.Skill,
                order_info_entity_1.Order,
            ]),
        ],
        exports: [typeorm_1.TypeOrmModule],
        controllers: [engineer_controller_1.EngineerController],
        providers: [engineer_service_1.EngineerService, skillUtil_service_1.SkillService],
    })
], EngineerModule);
//# sourceMappingURL=engineer.module.js.map