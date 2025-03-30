import { EntityManager } from 'typeorm';

/**
 * @param queryRunner QueryRunner instance
 * @param id  Order ID
 * @returns  Order Details
 * 파라미터 id 기반으로 주문 정보를 조회합니다.
 */
export default async function getOrderDetails(
  queryRunner: EntityManager,
  id: number,
) {
  return queryRunner
    .createQueryBuilder('CustomerEngineerOrder', 'ceo')
    .leftJoinAndSelect('ceo.customer', 'customer')
    .leftJoinAndSelect('ceo.order', 'order')
    .leftJoinAndSelect('ceo.engineer', 'engineer')
    .where('ceo.order_id = :id', { id })
    .getOne();
}
