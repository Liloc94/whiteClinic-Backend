import { Module } from '@nestjs/common';
import { OrderInfoService } from './order_info.service';
import { OrderInfoController } from './order_info.controller';

@Module({
  controllers: [OrderInfoController],
  providers: [OrderInfoService],
})
export class OrderInfoModule {}
