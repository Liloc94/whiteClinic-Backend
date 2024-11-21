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
const save_engineer_weeklyEarning_dto_1 = require("./dto/save-engineer-weeklyEarning.dto");
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
            return await this.engineerService.createEngineerInfo(createEngineerDto);
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error} 잘못된 요청입니다.`);
        }
    }
    async findAll() {
        try {
            return await this.engineerService.findAll();
        }
        catch (error) {
            throw new common_1.NotFoundException(error);
        }
    }
    async getAllSchedule() {
        try {
            return await this.engineerService.getAllSchedule();
        }
        catch (error) {
            throw new common_1.NotFoundException(error);
        }
    }
    async getEngineerSalary(id) {
        try {
            return await this.engineerService.getDailySalary(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(error);
        }
    }
    async saveEngineerWeeklySalary(weeklySalary) {
        try {
            return await this.engineerService.saveEngineerWeeklySalary(weeklySalary);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async findOne(id) {
        try {
            return await this.engineerService.findOne(+id);
        }
        catch (error) {
            throw new common_1.NotFoundException(error);
        }
    }
    async update(id, updateEngineerDto) {
        try {
            return await this.engineerService.updateEngineerInfo(+id, updateEngineerDto);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async remove(id) {
        return await this.engineerService.removeEngineerInfo(+id);
    }
};
exports.EngineerController = EngineerController;
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '기사 정보 저장완료',
        schema: {
            example: {
                engineer_valid_skill: ['벽걸이', '원웨이', '포웨이'],
                engineer_dayoff: ['dayoff & payday 동일', '월요일 ~ 일요일 중 선택'],
                engineer_commission_rate: ['다음 중 택 1', 50, 55, 60, 65, 70, 75, 80],
            },
        },
    }),
    (0, swagger_1.ApiOperation)({
        summary: '기사정보 저장 API',
        description: 'Body 에 담긴 정보를 기반으로 DB에 새로운 기사정보를 저장한다',
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
    (0, swagger_1.ApiOperation)({
        summary: '전체 기사정보 일괄조회 API',
        description: '모든 기사정보 조회 요청',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '기사정보 조회 완료' }),
    (0, common_1.Get)('searchAllEngineer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EngineerController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '전체 기사 스케쥴 일괄조회 API',
        description: '모든 기사들의 스케쥴 정보의 일괄조회를 요청',
    }),
    (0, common_1.Get)('getAllEngineerSchedule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EngineerController.prototype, "getAllSchedule", null);
__decorate([
    (0, common_1.Post)('getEngineerdailySalary:id'),
    (0, swagger_1.ApiOperation)({
        description: '파라미터로 받은 id를 가진 기사의 일급 정보를 호출한다',
        summary: '특정 기사의 날짜별 일당을 호출한다',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EngineerController.prototype, "getEngineerSalary", null);
__decorate([
    (0, common_1.Post)('saveEngineerWeeklySalary'),
    (0, swagger_1.ApiOperation)({
        description: '기사의 주급 및 지급여부를 저장한다',
        summary: '기사 아이디, 주급, 주차, 지급여부 저장,',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [save_engineer_weeklyEarning_dto_1.EngineerWeeklySalaryDto]),
    __metadata("design:returntype", Promise)
], EngineerController.prototype, "saveEngineerWeeklySalary", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, swagger_1.ApiOperation)({
        description: '파라미터로 전달받은 id의 기사정보를 조회',
        summary: '특정 기사의 정보를 조회한다',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EngineerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('updateEngineerInfo:id'),
    (0, swagger_1.ApiOperation)({
        description: '전달받은 id의 기사정보를 파라미터 값으로 수정한다',
        summary: '특정 기사의 정보를 업데이트한다.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_engineer_dto_1.UpdateEngineerDto]),
    __metadata("design:returntype", Promise)
], EngineerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        description: '파라미터로 전달받은 id를 가진 기사정보를 삭제',
        summary: '특정 기사의 정보를 삭제한다',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EngineerController.prototype, "remove", null);
exports.EngineerController = EngineerController = __decorate([
    (0, swagger_1.ApiTags)('기사정보 API'),
    (0, common_1.Controller)('engineer'),
    __metadata("design:paramtypes", [engineer_service_1.EngineerService])
], EngineerController);
//# sourceMappingURL=engineer.controller.js.map