import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryController } from './controllers/library.controller';
import { LibrarySectionController } from './controllers/librarySection.controller';
import { Library } from './entities/library.entity';
import { LibraryItem } from './entities/libraryItem.entity';
import { LibrarySection } from './entities/librarySection.entity';
import { LibraryService } from './services/library.service';
import { LibraryItemService } from './services/libraryItem.service';
import { LibrarySectionService } from './services/librarySection.service';

@Module({
  imports: [TypeOrmModule.forFeature([Library, LibrarySection, LibraryItem])],
  controllers: [LibraryController, LibrarySectionController],
  providers: [LibraryService, LibrarySectionService, LibraryItemService],
})
export class LibraryModule {}
