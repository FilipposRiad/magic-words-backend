import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './words/word.entity';
import { WordsModule } from './words/words.module';
import { WordStatistics } from './word_statistics/word_statistics.entity';
import { Translation } from './translations/translation.entity';
import { MemoryGameStatisticsModule } from './memory-game-statistics/memory-game-statistics.module';
import { MemoryGameStatistics } from './memory-game-statistics/memory-game-statistics.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [Word, Translation, WordStatistics, MemoryGameStatistics],
      synchronize: true,
    }),
    WordsModule,
    MemoryGameStatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
