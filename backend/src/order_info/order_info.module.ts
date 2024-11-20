import { IncomeInfoService } from 'src/income.service';
import { Module } from '@nestjs/common';
import { OrderInfoService } from './order_info.service';
import { OrderInfoController } from './order_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEngineerOrder } from './entities/customer_engineer_order.entity';
import { Order } from './entities/order_info.entity';
import { Engineer } from 'src/engineer/entities/engineer.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { EngineerWeeklyEarning } from 'src/engineer/entities/engineer_weekly_earning.entity';
import { EngineerDailyEarning } from 'src/engineer/entities/engineer_daily_earning.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerEngineerOrder,
      EngineerWeeklyEarning,
      EngineerDailyEarning,
      Engineer,
      Order,
      Customer,
    ]),
  ],
  exports: [TypeOrmModule],
  controllers: [OrderInfoController],
  providers: [OrderInfoService, IncomeInfoService],
})
export class OrderInfoModule {}
