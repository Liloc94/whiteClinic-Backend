import { EngineerScheduleDto } from 'src/engineer/dto/search-engineer-schedule.dto';
import { EngineerSkill } from 'src/engineer/entities/engineer_skill.entity';
import { OrderListDto } from 'src/order_info/dto/search-order-list.dto';
import { CustomerEngineerOrder } from 'src/order_info/entities/customer_engineer_order.entity';
import { In } from 'typeorm';

export async function handleEngineerScheduleData(
  orderDetails: any[],
): Promise<EngineerScheduleDto[]> {
  const scheduleList: EngineerScheduleDto[] = orderDetails.map((detail) => {
    const { customer, engineer, order } = detail;
    const order_timeslot = order.order_timeslot || '08:00 ~ 09:00'; // 예시 기본값

    return {
      order_id: order.order_id,
      engineer_id: engineer.engineer_id,
      customer_id: customer.customer_id,
      order_date: order.order_date,
      //TODO : 화면설계 완료 이후 timeslot 추가할지 버릴지 정하기
      order_timeslot: order_timeslot, // 없으면 고정문자열 동적으로 출력
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

// 스킬 이름 배열을 받아서 해당하는 스킬 ID를 반환
export async function findSkillIdsByNames(
  skillNames: string[],
): Promise<number[]> {
  const skills = await this.skillRepository.find({
    where: { skill_type: In(skillNames) }, // skillNames 배열에 포함된 이름으로 스킬 검색
  });

  if (skills.length === 0) {
    throw new Error('입력값과 일치하는 품목이 존재하지 않습니다.');
  }

  // 매칭되는 스킬의 ID만 추출하여 배열로 반환
  return skills.map((skill) => skill.skill_id);
}

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
