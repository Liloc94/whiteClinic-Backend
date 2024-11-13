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
exports.EngineerController = void 0;
const common_1 = require("@nestjs/common");
const engineer_service_1 = require("./engineer.service");
const create_engineer_dto_1 = require("./dto/create-engineer.dto");
const update_engineer_dto_1 = require("./dto/update-engineer.dto");
const swagger_1 = require("@nestjs/swagger");
let EngineerController = class EngineerController {
    constructor(engineerService) {
        this.engineerService = engineerService;
    }
    async create(createEngineerDto) {
        try {
            console.log('Request received:', createEngineerDto);
            return await this.engineerService.create(createEngineerDto);
        }
        catch (error) {
            console.log(error);
        }
    }
    findAll() {
        return this.engineerService.findAll();
    }
    findOne(id) {
        return this.engineerService.findOne(+id);
    }
    update(id, updateEngineerDto) {
        return this.engineerService.update(+id, updateEngineerDto);
    }
    remove(id) {
        return this.engineerService.remove(+id);
    }
};
exports.EngineerController = EngineerController;
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '기사 정보 저장완료',
        schema: {
            example: {
                engineer_valid_skill: [
                    '하위 카테고리중 택',
                    '벽걸이',
                    '원웨이',
                    '포웨이',
                    '원형',
                    '스탠드',
                    '실외기',
                    '덕트',
                    '창문형',
                    '통돌이',
                    '드럼',
                    '빌트인',
                    '건조기',
                ],
                engineer_dayoff: [
                    'dayoff & payday 동일',
                    '월요일',
                    '화요일',
                    '수요일',
                    '목요일',
                    '금요일',
                    '토요일',
                    '일요일',
                ],
                engineer_commission_rate: ['다음 중 택 1', 50, 55, 60, 65, 70, 75, 80],
            },
        },
    }),
    (0, swagger_1.ApiBody)({
        description: '기사 정보 생성 요청',
        type: create_engineer_dto_1.CreateEngineerDto,
    }),
    (0, common_1.Post)('createEngineer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_engineer_dto_1.CreateEngineerDto]),
    __metadata("design:returntype", Promise)
], EngineerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EngineerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EngineerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_engineer_dto_1.UpdateEngineerDto]),
    __metadata("design:returntype", void 0)
], EngineerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EngineerController.prototype, "remove", null);
exports.EngineerController = EngineerController = __decorate([
    (0, swagger_1.ApiTags)('기사정보 API'),
    (0, common_1.Controller)('engineer'),
    __metadata("design:paramtypes", [engineer_service_1.EngineerService])
], EngineerController);
//# sourceMappingURL=engineer.controller.js.map