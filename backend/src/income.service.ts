import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EngineerDailyEarning } from './engineer/entities/engineer_daily_earning.entity';
import { IncomeType } from 'src/util/constants/types';

@Injectable()
export class IncomeInfoService {
  constructor(private readonly dataSource: DataSource) {}

  async saveDailyIncome(incomeData: IncomeType) {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(EngineerDailyEarning, {
        daily_income: incomeData.daily_income,
        date: incomeData.date,
        order: { order_id: incomeData.order_id }, // 실제 order_id 값 사용
        engineer: { engineer_id: incomeData.engineer_id }, // 실제 engineer_id 값 사용
      });
      queryRunner.commitTransaction();
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
