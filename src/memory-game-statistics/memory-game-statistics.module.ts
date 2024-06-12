import { Module } from '@nestjs/common';
import { MemoryGameStatisticsController } from './memory-game-statistics.controller';
import { MemoryGameStatisticsService } from './memory-game-statistics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoryGameStatistics } from './memory-game-statistics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemoryGameStatistics])],
  controllers: [MemoryGameStatisticsController],
  providers: [MemoryGameStatisticsService],
})
export class MemoryGameStatisticsModule {}
