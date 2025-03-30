import { Module } from '@nestjs/common';
import { EngineerService } from './engineer.service';
import { EngineerController } from './engineer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngineerDailyEarning } from './entities/engineer_daily_earning.entity';
import { Engineer } from './entities/engineer.entity';
import { EngineerSkill } from './entities/engineer_skill.entity';
import { Skill } from './entities/skills.entity';
import { Order } from 'src/order/entities/order_info.entity';
import { CustomerEngineerOrder } from 'src/order/entities/customer_engineer_order.entity';
import { SkillService } from 'src/skillUtil.service';
import { EngineerWeeklyEarning } from './entities/engineer_weekly_earning.entity';
import { TempEngineer } from './entities/temp_emgineer_info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerEngineerOrder,
      EngineerDailyEarning,
      EngineerWeeklyEarning,
      Engineer,
      TempEngineer,
      EngineerSkill,
      Skill,
      Order,
    ]),
  ],
  exports: [TypeOrmModule],
  controllers: [EngineerController],
  providers: [EngineerService, SkillService],
})
export class EngineerModule {}
