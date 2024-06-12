import { Module } from '@nestjs/common';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './word.entity';
import { Translation } from 'src/translations/translation.entity';
import { WordStatistics } from 'src/word_statistics/word_statistics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Word, WordStatistics, Translation])],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
