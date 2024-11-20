import { EngineerScheduleDto } from 'src/engineer/dto/search-engineer-schedule.dto';
import { EngineerSkill } from 'src/engineer/entities/engineer_skill.entity';
import { CreateOrderInfoDto } from 'src/order_info/dto/create-order_info.dto';
import { OrderListDto } from 'src/order_info/dto/search-order-list.dto';
import { CustomerEngineerOrder } from 'src/order_info/entities/customer_engineer_order.entity';

export async function handleEngineerScheduleData(
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

export async function handleMappedData() {}

/**
 *
 * @param engineerWithSkill 기사 가능품목 배열
 * @returns 모든 기사정보 + 해당 기사의 가능품목 배열 반환
 */
export async function handleEngineerData(engineerWithSkill: EngineerSkill[]) {
  const engineerMap = new Map<number, any>();

  engineerWithSkill.forEach((engineerSkill) => {
    const { engineer, skill } = engineerSkill;

    // 엔지니어가 이미 map에 있다면 스킬만 추가
    if (engineerMap.has(engineer.engineer_id)) {
      engineerMap
        .get(engineer.engineer_id)
        .engineer_skills.push(skill.skill_type);
    } else {
      // 엔지니어가 처음 등장하는 경우, 엔지니어 정보와 스킬을 함께 추가
      engineerMap.set(engineer.engineer_id, {
        ...engineer,
        engineer_skills: [skill.skill_type],
      });
    }
  });
  console.log([...engineerMap]);
  return Array.from(engineerMap.values());
}

/**
 *
 * @param orderDetails CustomerEngineerOrder 테이블의 모든 JoinColumn 데이터
 * @returns 상세 주문정보 배열 형태로 반환
 */
export async function handleOrderDetailsData(
  orderDetails: CustomerEngineerOrder[],
): Promise<OrderListDto[]> {
  const orderList: OrderListDto[] = orderDetails.map((infos) => {
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

/**
 *
 * @param orderInfo 주문등록 시 입력 정보, CreateOrderInfoDto 타입
 * @returns [주문정보, 고객정보, 기사성함] 배열로 반환
 */
export async function handleCreateOrderInfo(
  orderInfo: CreateOrderInfoDto,
): Promise<any> {
  const {
    order_customer_addr,
    order_customer_name,
    order_customer_phone,
    order_remark,
    order_engineer_name: engineer_name,
    ...rest
  } = orderInfo;

  const customerInfo = {
    customer_name: order_customer_name,
    customer_phone: order_customer_phone,
    customer_addr: order_customer_addr,
    customer_remark: order_remark,
  };

  return [rest, customerInfo, engineer_name];
}
