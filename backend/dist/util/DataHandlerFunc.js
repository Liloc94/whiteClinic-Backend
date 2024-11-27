"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEngineerScheduleData = handleEngineerScheduleData;
exports.handleMappedData = handleMappedData;
exports.handleEngineerData = handleEngineerData;
exports.handleOrderDetailsData = handleOrderDetailsData;
exports.handleCreateOrderInfo = handleCreateOrderInfo;
exports.extractOrderDetail = extractOrderDetail;
exports.extractScheduleDetail = extractScheduleDetail;
const common_1 = require("@nestjs/common");
async function handleEngineerScheduleData(orderDetails) {
    const scheduleList = orderDetails.map((detail) => {
        const { customer, engineer, order } = detail;
        return {
            order_id: order.order_id,
            engineer_id: engineer.engineer_id,
            customer_id: customer.customer_id,
            order_date: order.order_date,
            engineer_name: engineer.engineer_name,
            customer_name: customer.customer_name,
            customer_addr: customer.customer_addr,
            customer_phone: customer.customer_phone,
            order_product: order.order_category,
            order_product_detail: order.order_product,
            order_count: order.order_count,
            order_total_amount: order.order_total_amount,
            order_remarks: order.order_remark,
            customer_remarks: customer.customer_remark,
        };
    });
    return scheduleList;
}
async function handleMappedData() { }
async function handleEngineerData(engineerWithSkill) {
    const engineerMap = new Map();
    engineerWithSkill.forEach((engineerSkill) => {
        const { engineer, skill } = engineerSkill;
        if (engineerMap.has(engineer.engineer_id)) {
            engineerMap
                .get(engineer.engineer_id)
                .engineer_skills.push(skill.skill_type);
        }
        else {
            engineerMap.set(engineer.engineer_id, {
                ...engineer,
                engineer_skills: [skill.skill_type],
            });
        }
    });
    return Array.from(engineerMap.values());
}
async function handleOrderDetailsData(orderDetails) {
    const orderList = orderDetails.map((infos) => {
        return {
            order_date: infos.order.order_date,
            customer_name: infos.customer.customer_name,
            customer_phone: infos.customer.customer_phone,
            customer_addr: infos.customer.customer_addr,
            customer_remark: infos.customer.customer_remark,
            engineer_name: infos.engineer.engineer_name,
            order_product: infos.order.order_product,
            order_payment: infos.order.order_payment,
            order_receipt_docs: infos.order.order_receipt_docs,
            receipt_docs_issued: infos.order.reciept_docs_issued,
        };
    });
    return orderList;
}
async function handleCreateOrderInfo(orderInfo) {
    const { order_customer_addr, order_customer_name, order_customer_phone, order_customer_remark, order_engineer_name: engineer_name, ...rest } = orderInfo;
    const customerInfo = {
        customer_name: order_customer_name,
        customer_phone: order_customer_phone,
        customer_addr: order_customer_addr,
        customer_remark: order_customer_remark,
    };
    return [rest, customerInfo, engineer_name];
}
async function extractOrderDetail(dataSource, targetEntity) {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const orderDetails = await queryRunner.manager
            .createQueryBuilder(targetEntity, 'CustomerEngineerOrder')
            .leftJoinAndSelect('CustomerEngineerOrder.customer', 'customer')
            .leftJoinAndSelect('CustomerEngineerOrder.order', 'order')
            .leftJoinAndSelect('CustomerEngineerOrder.engineer', 'engineer')
            .getMany();
        if (!orderDetails || orderDetails.some((detail) => !detail.order)) {
            throw new common_1.NotFoundException('Some orders are missing');
        }
        await queryRunner.commitTransaction();
        return handleOrderDetailsData(orderDetails);
    }
    catch (error) {
        await queryRunner.rollbackTransaction();
        console.error('트랜잭션 실패:', error);
        throw new common_1.HttpException('Failed to extract order details', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    finally {
        if (!queryRunner.isReleased) {
            await queryRunner.release();
        }
    }
}
async function extractScheduleDetail(dataSource, targetEntity) {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const orderDetails = await queryRunner.manager
            .createQueryBuilder(targetEntity, 'CustomerEngineerOrder')
            .leftJoinAndSelect('CustomerEngineerOrder.customer', 'customer')
            .leftJoinAndSelect('CustomerEngineerOrder.order', 'order')
            .leftJoinAndSelect('CustomerEngineerOrder.engineer', 'engineer')
            .getMany();
        if (!orderDetails || orderDetails.some((detail) => !detail.order)) {
            throw new common_1.NotFoundException('Some orders are missing');
        }
        await queryRunner.commitTransaction();
        return handleEngineerScheduleData(orderDetails);
    }
    catch (error) {
        await queryRunner.rollbackTransaction();
        console.error('트랜잭션 실패:', error);
        throw new common_1.HttpException('Failed to extract order details', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
//# sourceMappingURL=DataHandlerFunc.js.map