import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EngineerWeeklyEarning } from './engineer/entities/engineer_weekly_earning.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EngineerDailyEarning } from './engineer/entities/engineer_daily_earning.entity';

@Injectable()
export class IncomeInfoService {
  constructor(
    @InjectRepository(EngineerWeeklyEarning)
    private readonly weeklyEarningRepository: Repository<EngineerWeeklyEarning>,

    @InjectRepository(EngineerDailyEarning)
    private readonly dailyEarningRepository: Repository<EngineerDailyEarning>,

    private readonly dataSource: DataSource,
  ) {}

  async saveDailyIncome(incomeData) {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(EngineerDailyEarning, { ...incomeData });

      queryRunner.commitTransaction();
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
