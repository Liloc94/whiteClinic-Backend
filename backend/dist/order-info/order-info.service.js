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
exports.OrderInfoService = void 0;
const common_1 = require("@nestjs/common");
const order_info_entity_1 = require("./entities/order_info.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let OrderInfoService = class OrderInfoService {
    constructor(orderDataRepository) {
        this.orderDataRepository = orderDataRepository;
    }
    async getAll() {
        return this.orderDataRepository.find();
    }
    async getOne(orderId) {
        const order = await this.orderDataRepository.findOne({
            where: { orderId },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID: ${orderId} not found`);
        }
        else {
            return order;
        }
    }
    async update(orderId, updateData) {
        const order = await this.orderDataRepository.findOneBy({ orderId });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID : ${orderId} not found`);
        }
        else {
            Object.assign(order, updateData);
            const result = await this.orderDataRepository.save(order);
            return result;
        }
    }
    async create(orderInfo) {
        await this.orderDataRepository.save({ ...orderInfo });
    }
    async remove(orderId) {
        const order = await this.orderDataRepository.findOneBy({ orderId });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID : ${orderId} not found`);
        }
        else {
            await this.orderDataRepository.delete({ orderId });
        }
    }
};
exports.OrderInfoService = OrderInfoService;
exports.OrderInfoService = OrderInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_info_entity_1.OrderInfo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderInfoService);
//# sourceMappingURL=order-info.service.js.map