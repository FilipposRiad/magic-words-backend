import { Test, TestingModule } from '@nestjs/testing';
import { MemoryGameStatisticsController } from './memory-game-statistics.controller';

describe('MemoryGameStatisticsController', () => {
  let controller: MemoryGameStatisticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemoryGameStatisticsController],
    }).compile();

    controller = module.get<MemoryGameStatisticsController>(MemoryGameStatisticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
