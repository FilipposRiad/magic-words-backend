import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'words_statistics' })
export class WordStatistics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timesEncountered: number;

  @Column({ nullable: true })
  lastDateEncountered: Date;
}
