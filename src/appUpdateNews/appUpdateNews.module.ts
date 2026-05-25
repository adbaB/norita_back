import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUpdateNews } from './entities/appUpdateNews.entity';
import { UpdateSection } from './entities/updateSection.entity';
import { UpdateItem } from './entities/updateItem.entity';
import { AppUpdateNewsController } from './controllers/appUpdateNews.controller';
import { AppUpdateNewsService } from './services/appUpdateNews.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppUpdateNews, UpdateSection, UpdateItem])],
  controllers: [AppUpdateNewsController],
  providers: [AppUpdateNewsService],
  exports: [AppUpdateNewsService],
})
export class AppUpdateNewsModule {}
