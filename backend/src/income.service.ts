import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EngineerWeeklyEarning } from './engineer/entities/engineer_weekly_earning.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EngineerDailyEarning } from './engineer/entities/engineer_daily_earning.entity';
import { IncomeType } from './util/constantTypes';

@Injectable()
export class IncomeInfoService {
  constructor(
    @InjectRepository(EngineerWeeklyEarning)
    private readonly weeklyEarningRepository: Repository<EngineerWeeklyEarning>,

    @InjectRepository(EngineerDailyEarning)
    private readonly dailyEarningRepository: Repository<EngineerDailyEarning>,

    private readonly dataSource: DataSource,
  ) {}

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
