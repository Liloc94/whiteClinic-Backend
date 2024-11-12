import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Engineer } from '../entities/engineer.entity';
import { Repository } from 'typeorm';
import { EngineerDailyEarnings } from '../entities/engineer_daily_earnings.entity';
import { EngineerPayday } from '../entities/engineer_payday.entity';
import { EngineerCommissionRates } from '../entities/engineer_commission.rate.entity';

@Injectable()
export class EngineerInfoService {
  constructor(
    @InjectRepository(Engineer)
    private readonly EngineerRepository: Repository<Engineer>,

    @InjectRepository(EngineerDailyEarnings)
    private readonly engineerDailyearningsReopsitory: Repository<EngineerDailyEarnings>,

    @InjectRepository(EngineerPayday)
    private readonly EngineerPayDayRepository: Repository<EngineerPayday>,

    @InjectRepository(EngineerCommissionRates)
    private readonly EngineerCommissionRatesRepository: Repository<EngineerCommissionRates>,
  ) {}

  async engineer(): Promise<Engineer[]> {
    const engineerData = await this.EngineerRepository.find();
    console.log(engineerData);
    return engineerData;
  }

  async enginnerPay(): Promise<EngineerDailyEarnings[]> {
    const engineerPay = await this.engineerDailyearningsReopsitory.find();
    console.log(engineerPay);
    return engineerPay;
  }

  async engineerPayDay(): Promise<EngineerPayday[]> {
    const engineerPayDay = await this.EngineerPayDayRepository.find();
    return engineerPayDay.map(this.dayToName);
  }
  private dayToName(payDay: EngineerPayday): any {
    const dayNames = [
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
      '일요일',
    ];

    const dayName = dayNames[payDay.weekday.id - 1] || '없음';

    return {
      ...payDay,
      weekdays: dayName,
    };
  }

  async engineerCommissionRates(): Promise<EngineerCommissionRates[]> {
    const engineerCommissionRates =
      await this.EngineerCommissionRatesRepository.find();
    console.log(engineerCommissionRates);

    return engineerCommissionRates.map(this.RatesToFilter);
  }
  private RatesToFilter(rate: EngineerCommissionRates): any {
    const rateArray = [50, 55, 60, 65, 70, 75, 80];
    const resultRate = rateArray[rate.commissionRateId - 1] || '없음';

    return {
      ...rate,
      rateId: resultRate,
    };
  }
}
