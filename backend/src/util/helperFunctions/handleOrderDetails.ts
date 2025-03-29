import { OrderListDto } from 'src/order/dto/search-order-list.dto';
import { CustomerEngineerOrder } from 'src/order/entities/customer_engineer_order.entity';

/**
 *
 * @param orderDetails CustomerEngineerOrder 테이블의 모든 JoinColumn 데이터
 * @returns OrderListDto[]
 * @description 상세 주문정보를 배열로 반환합니다.
 */
export default async function handleOrderDetailsData(
  orderDetails: CustomerEngineerOrder[],
): Promise<OrderListDto[]> {
  const orderList: OrderListDto[] = orderDetails.map((infos) => {
    return {
      order_id: infos.order.order_id,
      order_date: infos.order.order_date,
      customer_name: infos.customer.customer_name,
      customer_phone: infos.customer.customer_phone,
      customer_addr: infos.customer.customer_addr,
      customer_remark: infos.customer.customer_remark,
      engineer_name: infos.engineer.engineer_name,
      order_product: infos.order.order_product,
      order_payment: infos.order.order_payment,
      order_receipt_docs: infos.order.order_receipt_docs,
      receipt_docs_issued: infos.order.receipt_docs_issued,
    };
  });
  return orderList;
}
