import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Adjectives } from './entities/adjectives.entity';
import { Counters } from './entities/counters.entity';
import { Kana } from './entities/kana.entity';
import { Kanji } from './entities/kanji.entity';
import { Numbers } from './entities/numbers.entity';
import { Onomatopoeia } from './entities/onomatopoeia.entity';
import { Radicals } from './entities/radicals.entity';
import { Vocabulary } from './entities/vocabulary.entity';

import { LibraryTypeService } from './services/libraryType.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Adjectives,
      Counters,
      Kana,
      Kanji,
      Numbers,
      Onomatopoeia,
      Radicals,
      Vocabulary,
    ]),
  ],
  controllers: [],
  providers: [LibraryTypeService],
  exports: [LibraryTypeService],
})
export class LibraryTypeModule {}
