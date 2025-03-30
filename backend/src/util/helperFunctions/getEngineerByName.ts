import { NotFoundException } from '@nestjs/common';
import { Engineer } from 'src/engineer/entities/engineer.entity';

/**
 * @param queryRunner QueryRunner instance
 * @param engineerName Engineer name
 * @returns Engineer entity instance
 * @description 엔지니어 이름을 기반으로 엔지니어 정보를 조회합니다.
 */
export default async function getEngineerByName(
  queryRunner,
  engineerName: string,
) {
  const engineer = await queryRunner
    .createQueryBuilder(Engineer, 'engineer')
    .where('engineer.engineer_name = :engineerName', { engineerName })
    .getOne();

  if (!engineer) {
    throw new NotFoundException(`Engineer with name ${engineerName} not found`);
  }

  return engineer;
}
