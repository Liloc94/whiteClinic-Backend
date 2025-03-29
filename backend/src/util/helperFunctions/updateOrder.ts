import { Order } from 'src/order/entities/order_info.entity';

/**
 * @param order Order entity instance
 * @param updatedOrder updatedOrder entity instance
 * @description Order 엔티티의 필드를 업데이트합니다.
 * */
export default async function updateOrder(
  order: Order,
  updatedOrder: Partial<Order>,
) {
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
