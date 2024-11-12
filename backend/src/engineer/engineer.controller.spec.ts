import { Test, TestingModule } from '@nestjs/testing';
import { EngineerController } from './engineer.controller';
import { EngineerService } from './engineer.service';

describe('EngineerController', () => {
  let controller: EngineerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EngineerController],
      providers: [EngineerService],
    }).compile();

    controller = module.get<EngineerController>(EngineerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
