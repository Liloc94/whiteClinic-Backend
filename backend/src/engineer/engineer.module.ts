import { Module } from '@nestjs/common';
import { EngineerService } from './engineer.service';
import { EngineerController } from './engineer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngineerDailyEarning } from './entities/engineer_daily_earning.entity';
import { Engineer } from './entities/engineer.entity';
import { EngineerSkill } from './entities/engineer_skill.entity';
import { Skill } from './entities/skills.entity';
import { Order } from 'src/order_info/entities/order_info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EngineerDailyEarning,
      Engineer,
      EngineerSkill,
      Skill,
      Order,
    ]),
  ],
  exports: [TypeOrmModule],
  controllers: [EngineerController],
  providers: [EngineerService],
})
export class EngineerModule {}
