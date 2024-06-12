import { WordStatistics } from 'src/word_statistics/word_statistics.entity';

export interface CreateWordInterface {
  text: string;
  language: string;
  statistics: WordStatistics;
}
