import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppUpdateNewsService } from '../services/appUpdateNews.service';
import { AppUpdateNews } from '../entities/appUpdateNews.entity';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';

@ApiTags('App Update News')
@Controller('update-news')
export class AppUpdateNewsController {
  constructor(private readonly newsService: AppUpdateNewsService) {}

  @IsPublic()
  @ApiOperation({ summary: 'Obtener todas las novedades de actualización' })
  @ApiResponse({ status: 200, type: [AppUpdateNews] })
  @Get()
  async findAll(): Promise<AppUpdateNews[]> {
    return this.newsService.findAll();
  }

  @IsPublic()
  @ApiOperation({ summary: 'Obtener la novedad de actualización más reciente' })
  @ApiResponse({ status: 200, type: AppUpdateNews })
  @Get('latest')
  async findLatest(): Promise<AppUpdateNews | null> {
    return this.newsService.findLatest();
  }
}
