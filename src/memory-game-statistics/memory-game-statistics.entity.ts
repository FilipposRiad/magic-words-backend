import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'memory_game_statistics' })
export class MemoryGameStatistics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mismatches: number;

  @Column()
  date: Date;

  @Column()
  language: string;
}
