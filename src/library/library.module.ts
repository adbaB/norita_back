import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryTypeModule } from '../libraryType/libraryType.module';
import { LibraryController } from './controllers/library.controller';
import { LibraryItemController } from './controllers/libraryItem.controller';
import { LibrarySectionController } from './controllers/librarySection.controller';
import { Library } from './entities/library.entity';
import { LibraryItem } from './entities/libraryItem.entity';
import { LibrarySection } from './entities/librarySection.entity';
import { LibraryService } from './services/library.service';
import { LibraryItemService } from './services/libraryItem.service';
import { LibrarySectionService } from './services/librarySection.service';

@Module({
  imports: [TypeOrmModule.forFeature([Library, LibrarySection, LibraryItem]), LibraryTypeModule],
  controllers: [LibraryController, LibrarySectionController, LibraryItemController],
  providers: [LibraryService, LibrarySectionService, LibraryItemService],
})
export class LibraryModule {}
