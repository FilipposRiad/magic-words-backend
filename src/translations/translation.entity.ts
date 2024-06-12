import { Word } from 'src/words/word.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'translations' })
export class Translation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => Word, (word) => word.translations)
  parentWord: Word;
}
