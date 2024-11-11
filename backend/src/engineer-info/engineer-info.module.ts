import { Module } from '@nestjs/common';
import { EngineerInfoController } from './controller/engineer-info.controller';
import { EngineerInfoService } from './service/engineer-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Engineer } from './entities/engineer.entity';

import { EngineerCommissionRates } from './entities/engineer_commission.rate.entity';
import { EngineerDailyEarnings } from './entities/engineer_daily_earnings.entity';
import { EngineerPayday } from './entities/engineer_payday.entity';
import { CommissionRates } from './entities/commission_rate.entity';
import { EngineerDayoff } from './entities/engineer_day_off.entity';
import { EngineerSkillRemark } from './entities/engineer_skill_remark.entity';
import { EngineerWeeklyEarnings } from './entities/engineer_weely_earnings.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Engineer,
      EngineerDailyEarnings,
      EngineerPayday,
      EngineerCommissionRates,
      CommissionRates,
      EngineerDayoff,
      EngineerSkillRemark,
      EngineerWeeklyEarnings,
    ]),
  ],
  controllers: [EngineerInfoController],
  providers: [EngineerInfoService],
})
export class EngineerInfoModule {}
