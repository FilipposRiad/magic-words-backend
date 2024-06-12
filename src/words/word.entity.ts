import { Translation } from 'src/translations/translation.entity';
import { WordStatistics } from 'src/word_statistics/word_statistics.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'words' })
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  createdAt: Date;

  @Column()
  language: string;

  @OneToMany(() => Translation, (translation) => translation.parentWord, {
    cascade: true,
  })
  translations: Translation[];

  @OneToOne(() => WordStatistics, { cascade: true })
  @JoinColumn()
  statistics: WordStatistics;
}
