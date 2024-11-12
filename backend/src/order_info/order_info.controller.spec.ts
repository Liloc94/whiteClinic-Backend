import { Test, TestingModule } from '@nestjs/testing';
import { OrderInfoController } from './order_info.controller';
import { OrderInfoService } from './order_info.service';

describe('OrderInfoController', () => {
  let controller: OrderInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderInfoController],
      providers: [OrderInfoService],
    }).compile();

    controller = module.get<OrderInfoController>(OrderInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
