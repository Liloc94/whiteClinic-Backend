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
const typeorm_1 = require("@nestjs/typeorm");
const order_info_entity_1 = require("./entities/order_info.entity");
const typeorm_2 = require("typeorm");
const engineer_entity_1 = require("../engineer/entities/engineer.entity");
const customer_entity_1 = require("../customer/entities/customer.entity");
const customer_engineer_order_entity_1 = require("./entities/customer_engineer_order.entity");
const DataHandlerFunc_1 = require("../util/DataHandlerFunc");
let OrderInfoService = class OrderInfoService {
    constructor(orderInfoRepository, engineerRepository, customerRepository, OrderDetailRepository) {
        this.orderInfoRepository = orderInfoRepository;
        this.engineerRepository = engineerRepository;
        this.customerRepository = customerRepository;
        this.OrderDetailRepository = OrderDetailRepository;
    }
    async create(createOrderInfoDto) {
        const { order_customer_address, order_customer_name, order_customer_phone, order_remark, ...rest } = createOrderInfoDto;
        const customerInfo = {
            customer_name: order_customer_name,
            customer_phone: order_customer_phone,
            customer_address: order_customer_address,
            customer_remark: order_remark,
        };
        this.orderInfoRepository.save({ ...rest });
        this.customerRepository.save({ ...customerInfo });
        return createOrderInfoDto;
    }
    async findAll() {
        return await this.orderInfoRepository.find();
    }
    async findOrderDetails() {
        const orderDetails = await this.OrderDetailRepository.createQueryBuilder('CustomerEngineerOrder')
            .leftJoinAndSelect('CustomerEngineerOrder.customer', 'customer')
            .leftJoinAndSelect('CustomerEngineerOrder.order', 'order')
            .leftJoinAndSelect('CustomerEngineerOrder.engineer', 'engineer')
            .getMany();
        return await (0, DataHandlerFunc_1.handleOrderDetailsData)(orderDetails);
    }
    async findWithId(id) {
        return await this.orderInfoRepository.find({ where: { order_id: id } });
    }
    async update(id, updateOrderInfoDto) {
        return await this.orderInfoRepository.update({ ...updateOrderInfoDto }, { order_id: id });
    }
    async remove(id) {
        return await this.orderInfoRepository.delete({ order_id: id });
    }
};
exports.OrderInfoService = OrderInfoService;
exports.OrderInfoService = OrderInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_info_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(engineer_entity_1.Engineer)),
    __param(2, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(3, (0, typeorm_1.InjectRepository)(customer_engineer_order_entity_1.CustomerEngineerOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderInfoService);
//# sourceMappingURL=order_info.service.js.map