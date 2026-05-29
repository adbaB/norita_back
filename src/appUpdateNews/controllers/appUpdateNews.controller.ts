import { Controller, Get, Post, Body, Put, Param, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AppUpdateNewsService } from '../services/appUpdateNews.service';
import { AppUpdateNews } from '../entities/appUpdateNews.entity';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';
import { Roles } from '../../auth/decorators/role.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import { CreateAppUpdateNewsDto, UpdateAppUpdateNewsDto } from '../dto/create-appUpdateNews.dto';
import { Request } from 'express';
import { PayloadToken } from '../../libs/Auth/token';

@ApiTags('App Update News')
@Controller('update-news')
export class AppUpdateNewsController {
  constructor(private readonly newsService: AppUpdateNewsService) {}

  @IsPublic()
  @ApiOperation({ summary: 'Obtener todas las novedades de actualización' })
  @ApiResponse({ status: 200, type: [AppUpdateNews] })
  @Get()
  async findAll(@Req() req: Request): Promise<AppUpdateNews[]> {
    const role = (req.user as PayloadToken)?.role;
    const isAdmin = role === RoleEnum.ADMIN;
    return this.newsService.findAll(isAdmin);
  }

  @IsPublic()
  @ApiOperation({ summary: 'Obtener la novedad de actualización más reciente' })
  @ApiResponse({ status: 200, type: AppUpdateNews })
  @Get('latest')
  async findLatest(): Promise<AppUpdateNews | null> {
    return this.newsService.findLatest();
  }

  @Post()
  @Roles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva novedad de actualización' })
  @ApiResponse({ status: 201, type: AppUpdateNews })
  async create(@Body() dto: CreateAppUpdateNewsDto): Promise<AppUpdateNews> {
    return this.newsService.create(dto);
  }

  @Put(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una novedad de actualización por su ID' })
  @ApiResponse({ status: 200, type: AppUpdateNews })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAppUpdateNewsDto,
  ): Promise<AppUpdateNews> {
    return this.newsService.update(id, dto);
  }
}
