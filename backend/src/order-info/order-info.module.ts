import { Module } from '@nestjs/common';
import { OrderInfoService } from './order-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderInfo } from './entities/order_info.entity';
import { OrderInfoController } from './order-info.controller';
import { OrdersPay } from './entities/orders_pay.entity';
import { OrderTime } from './entities/order_time.entity';
import { Calendar } from './entities/calendar.entity';
import { EngineerCustomer } from './entities/engineer_customer.entity';
import { PaymentType } from './entities/payment_type.entity';
import { ProductDetail } from './entities/product_detail.entity';
import { ReceiptDocs } from './entities/receipt_type.Entity';
import { ProductType } from './entities/product_type.entity';
import { AirConditioner } from './entities/air_condition.entity';
import { WashingMachine } from './entities/washing_machine.entity';
import { SubmitOrder } from './entities/submit_order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderInfo,
      SubmitOrder,
      OrdersPay,
      OrderTime,
      Calendar,
      EngineerCustomer,
      PaymentType,
      ProductDetail,
      ProductType,
      ReceiptDocs,
      AirConditioner,
      WashingMachine,
    ]),
  ],
  controllers: [OrderInfoController],
  providers: [OrderInfoService],
  exports: [TypeOrmModule],
})
export class OrderInfoModule {}
