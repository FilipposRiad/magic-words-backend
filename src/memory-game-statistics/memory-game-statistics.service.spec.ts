import { Test, TestingModule } from '@nestjs/testing';
import { MemoryGameStatisticsService } from './memory-game-statistics.service';

describe('MemoryGameStatisticsService', () => {
  let service: MemoryGameStatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemoryGameStatisticsService],
    }).compile();

    service = module.get<MemoryGameStatisticsService>(MemoryGameStatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
