import { WordStatistics } from 'src/word_statistics/word_statistics.entity';

export interface UpdateWordInterface {
  text: string;
  language: string;
  statistics: WordStatistics;
}
