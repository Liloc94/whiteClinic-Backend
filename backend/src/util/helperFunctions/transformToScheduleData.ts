import { ScheduleInfoDto } from 'src/order/dto/search-schedule-dto';
import { CustomerEngineerOrder } from 'src/order/entities/customer_engineer_order.entity';

/**
 * @param order CustomerEngineerOrder entity instance
 * @returns ScheduleInfoDto
 * @description CustomerEngineerOrder 엔티티를 ScheduleInfoDto로 변환합니다.
 */
export default async function transformToScheduleData(
  order: CustomerEngineerOrder,
) {
  const scheduleObj: ScheduleInfoDto = {
    order_id: order.order?.order_id ?? null, // check if order exists
    engineer_id: order.engineer?.engineer_id ?? null, // check if engineer exists
    customer_id: order.customer?.customer_id ?? null, // check if customer exists
    order_date: order.order?.order_date ?? null,
    customer_name: order.customer?.customer_name ?? null,
    customer_phone: order.customer?.customer_phone ?? null,
    customer_addr: order.customer?.customer_addr ?? null,
    customer_remark: order.customer?.customer_remark ?? null,
    order_deposit: order.order?.order_deposit ?? null,
    deposit_paid: order.order?.deposit_paid ?? null,
    order_total_amount: order.order?.order_total_amount ?? null,
    order_payment: order.order?.order_payment ?? null,
    order_receipt_docs: order.order?.order_receipt_docs ?? null,
    receipt_docs_issued: order.order?.receipt_docs_issued ?? null,
    order_category: order.order?.order_category ?? null,
    order_product: order.order?.order_product ?? null,
    order_count: order.order?.order_count ?? null,
    order_isDiscount: order.order?.order_isDiscount ?? null,
    order_discount_ratio: order.order?.order_discount_ratio ?? null,
    engineer_name: order.engineer?.engineer_name ?? null,
  };

  return scheduleObj;
}
