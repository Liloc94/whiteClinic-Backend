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
const income_service_1 = require("../income.service");
let OrderInfoService = class OrderInfoService {
    constructor(orderInfoRepository, dataSource, incomeInfoService) {
        this.orderInfoRepository = orderInfoRepository;
        this.dataSource = dataSource;
        this.incomeInfoService = incomeInfoService;
    }
    async create(createOrderInfoDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const temp = await (0, DataHandlerFunc_1.handleCreateOrderInfo)(createOrderInfoDto);
            const savedOrderInfo = await queryRunner.manager.save(order_info_entity_1.Order, temp[0]);
            const savedCustomer = await queryRunner.manager.save(customer_entity_1.Customer, temp[1]);
            const engineer = await queryRunner.manager.findOneByOrFail(engineer_entity_1.Engineer, {
                engineer_name: temp[2],
            });
            const customerEngineerOrder = queryRunner.manager.create(customer_engineer_order_entity_1.CustomerEngineerOrder, {
                customer: savedCustomer,
                order: savedOrderInfo,
                engineer: engineer,
            });
            const incomes = {
                idx: null,
                order_id: savedOrderInfo.order_id,
                engineer_id: engineer.engineer_id,
                daily_income: savedOrderInfo.order_total_amount,
                date: savedOrderInfo.order_date,
            };
            await queryRunner.manager.save(customerEngineerOrder);
            await queryRunner.commitTransaction();
            await this.incomeInfoService.saveDailyIncome(incomes);
            const idx = customerEngineerOrder.idx;
            return { idx, savedOrderInfo, savedCustomer };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('트랜잭션 실패, 롤백 실행', error.message);
            throw error;
        }
        finally {
            if (!queryRunner.isReleased) {
                await queryRunner.release();
            }
        }
    }
    async findOrderDetails() {
        return await (0, DataHandlerFunc_1.extractOrderDetail)(this.dataSource, customer_engineer_order_entity_1.CustomerEngineerOrder);
    }
    async findWithId(id) {
        try {
            return await this.orderInfoRepository.findOne({
                where: { order_id: id },
            });
        }
        catch (error) {
            throw new common_1.NotFoundException(error);
        }
    }
    async updateOrderInfo(id, updateOrderInfoDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const temp = await (0, DataHandlerFunc_1.handleCreateOrderInfo)(updateOrderInfoDto);
            if (!temp || temp.length < 3 || temp.some((item) => !item)) {
                throw new Error('handleCreateOrderInfo returned invalid data');
            }
            const engineer = await queryRunner.manager.findOne(engineer_entity_1.Engineer, {
                where: { engineer_name: temp[2] },
            });
            const customerEngineerOrder = await queryRunner.manager.findOne(customer_engineer_order_entity_1.CustomerEngineerOrder, {
                where: { order: { order_id: id } },
                relations: ['customer', 'order', 'engineer'],
            });
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        queryRunner.connect();
        queryRunner.startTransaction();
        try {
            await queryRunner.manager.delete(order_info_entity_1.Order, { order_id: id });
            await queryRunner.commitTransaction();
        }
        catch (error) {
            queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            if (!queryRunner.isReleased) {
                await queryRunner.release();
            }
        }
    }
};
exports.OrderInfoService = OrderInfoService;
exports.OrderInfoService = OrderInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_info_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        income_service_1.IncomeInfoService])
], OrderInfoService);
//# sourceMappingURL=order_info.service.js.map