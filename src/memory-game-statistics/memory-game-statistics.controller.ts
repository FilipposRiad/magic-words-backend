import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateStatisticsDto } from './dto/create-statistics.dto';
import { MemoryGameStatisticsService } from './memory-game-statistics.service';

@Controller('memoryGameStatistics')
export class MemoryGameStatisticsController {
  constructor(
    private memoryGameStatisticsService: MemoryGameStatisticsService,
  ) {}

  @Get()
  getAllMemoryGameStatistics() {
    return this.memoryGameStatisticsService.getAllMemoryGameStatistics();
  }

  @Get('latest')
  getLatestGameStatistics() {
    return this.memoryGameStatisticsService.getLatestStatistics();
  }

  @Post()
  createStatistics(@Body() createStatisticsDto: CreateStatisticsDto) {
    return this.memoryGameStatisticsService.createStatistics(
      createStatisticsDto,
    );
  }
}
