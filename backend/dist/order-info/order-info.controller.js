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
exports.OrderInfoController = void 0;
const common_1 = require("@nestjs/common");
const order_info_service_1 = require("./order-info.service");
const swagger_1 = require("@nestjs/swagger");
const submit_order_dto_1 = require("./dto/submit_order.dto");
let OrderInfoController = class OrderInfoController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async getAll() {
        return this.orderService.getAll();
    }
    async getOne(orderId) {
        return this.orderService.getOne(orderId);
    }
    async updateOne(id, req) {
        return this.orderService.update(id, req);
    }
    async create(orderInfo) {
        return this.orderService.create(orderInfo);
    }
    async remove(orderId) {
        return this.orderService.remove(orderId);
    }
    findAll(res) {
        res.status(common_1.HttpStatus.OK).json([' library-specific response object test']);
    }
};
exports.OrderInfoController = OrderInfoController;
__decorate([
    (0, common_1.Get)('getAll'),
    (0, swagger_1.ApiOperation)({
        summary: 'OrderInfo 테이블 전체정보 조회 API',
        description: 'OrderInfo 테이블 정보를 일괄 조회한다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '주문정보 불러오기 성공' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderInfoController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('searchOrderBy:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'id 기반 주문정보 조회 API',
        description: 'id 파라미터와 매치되는 주문정보를 불러온다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '주문정보 불러오기 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderInfoController.prototype, "getOne", null);
__decorate([
    (0, common_1.Put)('updateOrderBy/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'id 기반 주문정보 수정',
        description: 'id 파라미터와 매치되는 주문정보를 DB 에서 찾아 수정한다. !! @Body 는 id를 제외하고 요청해야 한다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '주문정보 불러오기 성공' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, submit_order_dto_1.SubmitOrderDto]),
    __metadata("design:returntype", Promise)
], OrderInfoController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Post)('createOrder'),
    (0, swagger_1.ApiOperation)({
        summary: '주문정보 등록 API',
        description: '입력한 값을 기반으로 주문정보를 DB에 저장한다.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'SubmitOrderDto.json.',
        type: submit_order_dto_1.SubmitOrderDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '주문정보 불러오기 성공' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submit_order_dto_1.SubmitOrderDto]),
    __metadata("design:returntype", Promise)
], OrderInfoController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('deleteBy:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'id 기반 주문정보 삭제 API',
        description: 'id 파라미터와 매치되는 주문정보를 DB에서 삭제한다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '주문정보 불러오기 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderInfoController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('responseObject'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderInfoController.prototype, "findAll", null);
exports.OrderInfoController = OrderInfoController = __decorate([
    (0, common_1.Controller)('orderInfo'),
    (0, swagger_1.ApiTags)('주문정보 API'),
    __metadata("design:paramtypes", [order_info_service_1.OrderInfoService])
], OrderInfoController);
//# sourceMappingURL=order-info.controller.js.map