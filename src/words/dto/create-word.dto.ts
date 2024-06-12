import { WordStatistics } from 'src/word_statistics/word_statistics.entity';

export class CreateWordDto {
  text: string;
  language: string;
  statistics: WordStatistics;
}
