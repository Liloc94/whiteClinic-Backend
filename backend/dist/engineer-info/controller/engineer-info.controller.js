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
exports.EngineerInfoController = void 0;
const common_1 = require("@nestjs/common");
const engineer_info_service_1 = require("../service/engineer-info.service");
const swagger_1 = require("@nestjs/swagger");
let EngineerInfoController = class EngineerInfoController {
    constructor(engineerInfoService) {
        this.engineerInfoService = engineerInfoService;
    }
    async findAll() {
        try {
            const [engineer, engineerPay, engineerPayDay, EngineerCommissionRates] = await Promise.all([
                this.engineerInfoService.engineer(),
                this.engineerInfoService.enginnerPay(),
                this.engineerInfoService.engineerPayDay(),
                this.engineerInfoService.engineerCommissionRates(),
            ]);
            return {
                engineer,
                engineerPay,
                engineerPayDay,
                EngineerCommissionRates,
            };
        }
        catch (error) {
            console.error('잘못된 데이터입니다.', error);
            throw error;
        }
    }
};
exports.EngineerInfoController = EngineerInfoController;
__decorate([
    (0, common_1.Get)('getAll'),
    (0, swagger_1.ApiOperation)({
        summary: '기사 이름, 전화번호, 주소, 날짜-급여, 수당률, 스킬, 지급여부,지급일',
        description: '기사 이름, 전화번호, 주소를 불러온다.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EngineerInfoController.prototype, "findAll", null);
exports.EngineerInfoController = EngineerInfoController = __decorate([
    (0, common_1.Controller)('engineer-info'),
    (0, swagger_1.ApiTags)('기사정보 API'),
    __metadata("design:paramtypes", [engineer_info_service_1.EngineerInfoService])
], EngineerInfoController);
//# sourceMappingURL=engineer-info.controller.js.map