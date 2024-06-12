import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { WordsService } from './words.service';
import { UpdateWordDto } from './dto/update-word.dto';
import { UpdateWordsStatisticsDto } from './dto/update-words-statistics.dto';

@Controller('words')
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @Get()
  getWords() {
    return this.wordsService.getAllWords();
  }

  @Post()
  createWord(@Body() createWordDto: CreateWordDto) {
    return this.wordsService.createWord(createWordDto);
  }

  @Post('import')
  async importWords() {
    return await this.wordsService.importWords();
  }

  @Post('updateWordsStatistics')
  updateWordStatistics(
    @Body() updateWordStatisticsDto: UpdateWordsStatisticsDto,
  ) {
    return this.wordsService.updateWordsStatistics(updateWordStatisticsDto);
  }

  @Put(':id')
  updateWordById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWordDto: UpdateWordDto,
  ) {
    this.wordsService.updateWord(id, updateWordDto);
  }

  @Delete(':id')
  deleteWordById(@Param('id', ParseIntPipe) id: number) {
    return this.wordsService.deleteWord(id);
  }
}
