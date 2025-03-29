import { EngineerScheduleDto } from 'src/engineer/dto/search-engineer-schedule.dto';

/**
 * @param orderDetails CustomerEngineerOrder 테이블의 모든 JoinColumn 데이터
 * @returns 엔지니어 스케줄 정보 배열 형태로 반환
 * @description 엔지니어 스케줄 정보를 배열로 반환합니다.
 */
export default async function handleEngineerScheduleData(
  orderDetails: any[],
): Promise<EngineerScheduleDto[]> {
  const scheduleList: EngineerScheduleDto[] = orderDetails.map((detail) => {
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
