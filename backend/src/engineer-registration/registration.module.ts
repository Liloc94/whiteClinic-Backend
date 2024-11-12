import { Module } from '@nestjs/common';
import { RegistrationService } from './service/registration.service';
import { RegistrationController } from './controller/registration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Engineer } from 'src/engineer-info/entities/engineer.entity';
import { Skills } from './entities/skills.entity';
import { EngineerSkill } from './entities/enginner_skill.entity';
import { SpecialHolidays } from './entities/special_holidays.entity';
import { WeekDays } from './entities/weekdays.entity';
import { RegularHolidays } from './entities/regular_holiday.entity';
import { CommissionRates } from './entities/commission_rate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Engineer,
      Skills,
      CommissionRates,
      EngineerSkill,
      SpecialHolidays,
      WeekDays,
      RegularHolidays,
    ]),
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
