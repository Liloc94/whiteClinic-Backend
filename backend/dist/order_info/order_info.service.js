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
const DataHandlerFunc_1 = require("../util/helper/DataHandlerFunc");
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
        return this.dataSource.transaction(async (queryRunner) => {
            const orderDetails = await this.getOrderDetails(queryRunner, id);
            if (!orderDetails) {
                throw new common_1.NotFoundException(`No existing record found for order ID ${id}`);
            }
            const paramOrderData = await (0, DataHandlerFunc_1.handleCreateOrderInfo)(updateOrderInfoDto);
            this.updateCustomer(orderDetails.customer, paramOrderData.customer);
            this.updateOrder(orderDetails.order, paramOrderData.order);
            const engineer = await this.getEngineerByName(queryRunner, paramOrderData.engineer_name);
            orderDetails.engineer = engineer;
            await queryRunner.save(orderDetails.customer);
            await queryRunner.save(orderDetails.order);
            await queryRunner.save(orderDetails);
            return { message: 'Order updated successfully' };
        });
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
    async getOrderDetails(queryRunner, id) {
        return queryRunner
            .createQueryBuilder('CustomerEngineerOrder', 'ceo')
            .leftJoinAndSelect('ceo.customer', 'customer')
            .leftJoinAndSelect('ceo.order', 'order')
            .leftJoinAndSelect('ceo.engineer', 'engineer')
            .where('ceo.order_id = :id', { id })
            .getOne();
    }
    updateCustomer(customer, updatedCustomer) {
        customer.customer_name = updatedCustomer.customer_name;
        customer.customer_phone = updatedCustomer.customer_phone;
        customer.customer_addr = updatedCustomer.customer_addr;
        customer.customer_remark = updatedCustomer.customer_remark;
    }
    updateOrder(order, updatedOrder) {
        order.order_category = updatedOrder.order_category;
        order.order_date = updatedOrder.order_date;
        order.order_product = updatedOrder.order_product;
        order.order_total_amount = updatedOrder.order_total_amount;
        order.order_count = updatedOrder.order_count;
        order.order_isDiscount = updatedOrder.order_isDiscount;
        order.order_discount_ratio = updatedOrder.order_discount_ratio;
        order.order_remark = updatedOrder.order_remark;
        order.order_deposit = updatedOrder.order_deposit;
        order.deposit_paid = updatedOrder.deposit_paid;
        order.order_payment = updatedOrder.order_payment;
        order.order_receipt_docs = updatedOrder.order_receipt_docs;
        order.receipt_docs_issued = updatedOrder.receipt_docs_issued;
    }
    async getEngineerByName(queryRunner, engineerName) {
        const engineer = await queryRunner
            .createQueryBuilder(engineer_entity_1.Engineer, 'engineer')
            .where('engineer.engineer_name = :engineerName', { engineerName })
            .getOne();
        if (!engineer) {
            throw new common_1.NotFoundException(`Engineer with name ${engineerName} not found`);
        }
        return engineer;
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