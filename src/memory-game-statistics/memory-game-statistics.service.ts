import { Injectable } from '@nestjs/common';
import { CreateStatisticsInterface } from './interfaces/create-statistics.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { MemoryGameStatistics } from './memory-game-statistics.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemoryGameStatisticsService {
  constructor(
    @InjectRepository(MemoryGameStatistics)
    private memoryGameStatisticsRepository: Repository<MemoryGameStatistics>,
  ) {}

  async getAllMemoryGameStatistics() {
    return (await this.memoryGameStatisticsRepository.find()).sort(
      (a: MemoryGameStatistics, b: MemoryGameStatistics) => {
        return a.date.getTime() - b.date.getTime();
      },
    );
  }

  async getLatestStatistics() {
    var germanGameStatistics: MemoryGameStatistics[] =
      await this.memoryGameStatisticsRepository.find({
        where: { language: 'German' },
      });

    germanGameStatistics.sort(
      (a: MemoryGameStatistics, b: MemoryGameStatistics) => {
        return b.date.getTime() - a.date.getTime();
      },
    );

    var greekGameStatistics: MemoryGameStatistics[] =
      await this.memoryGameStatisticsRepository.find({
        where: { language: 'Greek' },
      });

    greekGameStatistics.sort(
      (a: MemoryGameStatistics, b: MemoryGameStatistics) => {
        return b.date.getTime() - a.date.getTime();
      },
    );

    return [
      ...germanGameStatistics.slice(0, 5),
      ...greekGameStatistics.slice(0, 5),
    ];
  }

  createStatistics(statistics: CreateStatisticsInterface) {
    const newStatistics = this.memoryGameStatisticsRepository.create({
      ...statistics,
      date: new Date(),
    });

    return this.memoryGameStatisticsRepository.save(newStatistics);
  }
}
