"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempEngineer = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const engineer_entity_1 = require("./engineer.entity");
let TempEngineer = class TempEngineer extends (0, swagger_1.PartialType)(engineer_entity_1.Engineer) {
};
exports.TempEngineer = TempEngineer;
exports.TempEngineer = TempEngineer = __decorate([
    (0, typeorm_1.Entity)('temp_engineer_info')
], TempEngineer);
//# sourceMappingURL=temp_emgineer_info.entity.js.map