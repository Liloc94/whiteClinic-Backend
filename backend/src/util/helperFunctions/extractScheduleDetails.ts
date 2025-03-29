import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DataSource } from 'typeorm';
import handleEngineerScheduleData from './handleEngineerScheduleData';

/**
 * @param dataSource DataSource
 * @param targetEntity CustomerEngineerOrder
 * @returns 엔지니어 스케줄 정보 배열 형태로 반환
 * @description 엔지니어 스케줄 정보를 추출하는 함수
 */
export default async function extractScheduleDetail(
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

    return await handleEngineerScheduleData(orderDetails);
  } catch (error) {
    await queryRunner.rollbackTransaction();

    throw new HttpException(
      'Failed to extract order details : ' + error,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
