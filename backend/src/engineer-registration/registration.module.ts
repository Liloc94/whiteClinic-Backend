import { Module } from '@nestjs/common';
import { RegistrationService } from './service/registration.service';
import { RegistrationController } from './controller/registration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Engineer } from 'src/engineer-info/entities/engineer.entity';
import { Skills } from './entities/Skills.entity';
import { EngineerSkill } from './entities/EngineerSkill.entity';
import { SpecialHolidays } from './entities/SpecialHolidays.entity';
import { WeekDays } from './entities/WeekDays.entity';
import { RegularHolidays } from './entities/RegularHolidays.entity';
import { CommissionRates } from './entities/commissionRates.entity';

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
