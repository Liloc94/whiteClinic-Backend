"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOrderDetails = handleOrderDetails;
exports.handleMappedData = handleMappedData;
exports.findSkillIdsByNames = findSkillIdsByNames;
const typeorm_1 = require("typeorm");
async function handleOrderDetails(orderDetails) {
    const scheduleList = orderDetails.map((detail) => {
        const { customer, engineer, order } = detail;
        return {
            order_id: order.order_id,
            engineer_id: engineer.engineer_id,
            customer_id: customer.customer_id,
            order_date: order.order_date,
            order_timeslot: '',
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
async function findSkillIdsByNames(skillNames) {
    const skills = await this.skillRepository.find({
        where: { skill_type: (0, typeorm_1.In)(skillNames) },
    });
    if (skills.length === 0) {
        throw new Error('입력값과 일치하는 품목이 존재하지 않습니다.');
    }
    return skills.map((skill) => skill.skill_id);
}
//# sourceMappingURL=DataHandlerFunc.js.map