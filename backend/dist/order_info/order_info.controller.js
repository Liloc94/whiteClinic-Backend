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
const order_info_service_1 = require("./order_info.service");
const create_order_info_dto_1 = require("./dto/create-order_info.dto");
const update_order_info_dto_1 = require("./dto/update-order_info.dto");
const swagger_1 = require("@nestjs/swagger");
let OrderInfoController = class OrderInfoController {
    constructor(orderInfoService) {
        this.orderInfoService = orderInfoService;
    }
    create(createOrderInfoDto) {
        return this.orderInfoService.create(createOrderInfoDto);
    }
    findAll() {
        return this.orderInfoService.findAll();
    }
    findOne(id) {
        return this.orderInfoService.findOne(+id);
    }
    update(id, updateOrderInfoDto) {
        return this.orderInfoService.update(+id, updateOrderInfoDto);
    }
    remove(id) {
        return this.orderInfoService.remove(+id);
    }
};
exports.OrderInfoController = OrderInfoController;
__decorate([
    (0, common_1.Post)('createNewOrder'),
    (0, swagger_1.ApiBody)({ type: create_order_info_dto_1.CreateOrderInfoDto }),
    (0, swagger_1.ApiOperation)({
        summary: '새로운 주문정보를 DB에 저장한다.',
        description: '입력한 정보를 DB 내부 order_info 테이블에 저장한다.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_info_dto_1.CreateOrderInfoDto]),
    __metadata("design:returntype", void 0)
], OrderInfoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getAllOrder'),
    (0, swagger_1.ApiOperation)({ summary: '모든 주문정보를 호출한다' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderInfoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '파라미터로 전달받은 id 를 기반으로 매치되는 주문정보를 호출한다.',
    }),
    (0, swagger_1.ApiParam)({ name: '아이디', example: '1 , 2 , 3' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderInfoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_info_dto_1.UpdateOrderInfoDto]),
    __metadata("design:returntype", void 0)
], OrderInfoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderInfoController.prototype, "remove", null);
exports.OrderInfoController = OrderInfoController = __decorate([
    (0, swagger_1.ApiTags)('주문정보 관련 API'),
    (0, common_1.Controller)('order-info'),
    __metadata("design:paramtypes", [order_info_service_1.OrderInfoService])
], OrderInfoController);
//# sourceMappingURL=order_info.controller.js.map