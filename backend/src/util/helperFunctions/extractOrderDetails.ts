import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import handleOrderDetailsData from './handleOrderDetails';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DataSource } from 'typeorm';

/**
 * @param dataSource DataSource
 * @param targetEntity CustomerEngineerOrder
 * @returns 상세 주문정보 배열 형태로 반환
 * @description 주문정보를 추출하는 함수
 */
export default async function extractOrderDetail(
  dataSource: DataSource,
  targetEntity: EntityClassOrSchema,
) {
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

    // 데이터 검증
    if (!orderDetails || orderDetails.some((detail) => !detail.order)) {
      throw new NotFoundException('Some orders are missing');
    }

    await queryRunner.commitTransaction();

    return await handleOrderDetailsData(orderDetails); // 트랜잭션 외부에서 데이터 처리
  } catch (error) {
    await queryRunner.rollbackTransaction();

    throw new HttpException(
      'Failed to extract order details : ' + error,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  } finally {
    if (!queryRunner.isReleased) {
      await queryRunner.release();
    }
  }
}
