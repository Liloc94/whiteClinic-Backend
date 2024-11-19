import { Module } from '@nestjs/common';
import { EngineerService } from './engineer.service';
import { EngineerController } from './engineer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngineerDailyEarning } from './entities/engineer_daily_earning.entity';
import { Engineer } from './entities/engineer.entity';
import { EngineerSkill } from './entities/engineer_skill.entity';
import { Skill } from './entities/skills.entity';
import { Order } from 'src/order_info/entities/order_info.entity';
import { CustomerEngineerOrder } from 'src/order_info/entities/customer_engineer_order.entity';
import { SkillService } from 'src/skillUtil.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerEngineerOrder,
      EngineerDailyEarning,
      Engineer,
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
