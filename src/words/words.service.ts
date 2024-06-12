import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from './word.entity';
import { Repository } from 'typeorm';
import { CreateWordInterface } from './interfaces/create-word.interface';
import { UpdateWordInterface } from './interfaces/update-word.interface';
import { Translation } from 'src/translations/translation.entity';
import { WordStatistics } from 'src/word_statistics/word_statistics.entity';
import { UpdateWordsStatisticsInterface } from './interfaces/update-words-statistics.interface';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word) private wordRepository: Repository<Word>,
    @InjectRepository(Translation)
    private translationRepository: Repository<Translation>,
    @InjectRepository(WordStatistics)
    private wordStatisticsRepository: Repository<WordStatistics>,
  ) {}

  getAllWords() {
    return this.wordRepository.find({
      relations: ['translations', 'statistics'],
    });
  }

  createWord(word: CreateWordInterface) {
    const newWord = this.wordRepository.create({
      ...word,
      createdAt: new Date(),
    });
    return this.wordRepository.save(newWord);
  }

  updateWord(id: number, word: UpdateWordInterface) {
    return this.wordRepository.update(
      { id },
      { ...word, createdAt: new Date() },
    );
  }

  async updateWordsStatistics(wordIds: UpdateWordsStatisticsInterface) {
    for (let id of wordIds.ids) {
      const wordToUpdate = await this.wordRepository.findOne({
        where: {
          id,
        },
        relations: ['statistics'],
      });

      if (wordToUpdate.statistics === null) {
        wordToUpdate.statistics = this.wordStatisticsRepository.create({
          timesEncountered: 1,
          lastDateEncountered: new Date(),
        });
        await this.wordRepository.save(wordToUpdate);
      } else {
        wordToUpdate.statistics.timesEncountered++;
        wordToUpdate.statistics.lastDateEncountered = new Date();
        await this.wordStatisticsRepository.save(wordToUpdate.statistics);
      }
    }

    return { response: 'Successfully Updated Word Statistics' };
  }

  deleteWord(id: number) {
    return this.wordRepository.delete({ id });
  }

  async importWords() {
    const fs = require('fs');
    const files = fs.readdirSync('./src/duo_data/');

    var wordCount = 0;
    var translationsCount = 0;
    var existingWordCount = 0;

    for (let file of files) {
      {
        const data = JSON.parse(
          fs.readFileSync('./src/duo_data/' + file, 'utf8'),
        );

        for (let word of data.learnedLexemes) {
          var foundWords = await this.wordRepository.find({
            where: {
              text: word.text,
            },
          });

          if (foundWords.some((w) => w.text === word.text)) {
            existingWordCount++;
            continue;
          }

          const newWord = this.wordRepository.create({
            text: word.text,
            createdAt: new Date(),
            language: file.includes('GR') ? 'Greek' : 'German',
            statistics: this.wordStatisticsRepository.create({
              timesEncountered: 0,
            }),
          });

          await this.wordRepository.save(newWord);
          wordCount++;

          for (let translation of word.translations) {
            // var foundTranslation = await this.translationRepository.findOneBy({
            //   text: translation,
            // });
            const newTranslation = this.translationRepository.create({
              text: translation,
              parentWord: newWord,
            });

            await this.translationRepository.save(newTranslation);
            translationsCount++;
          }
        }
      }
    }

    return `Created ${wordCount} words and ${translationsCount} translations. Encountered ${existingWordCount} already existing words.`;
  }
}
