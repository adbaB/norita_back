import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DiaryAikoService } from '../services/diaryAiko.service';
import { CreateDiaryAikoSectionDto } from '../dto/create-diaryAikoSection.dto';
import { UpdateDiaryAikoSectionDto } from '../dto/update-diaryAikoSection.dto';
import { DiaryAikoSection } from '../entities/diaryAikoSection.entity';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RoleEnum } from 'src/users/enum/role.enum';

@ApiTags('Diary Aiko Sections')
@Controller('diary-aiko-sections')
@ApiBearerAuth()
export class DiaryAikoController {
  constructor(private readonly diaryAikoService: DiaryAikoService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Create a new Diary Aiko section' })
  @ApiResponse({
    status: 201,
    description: 'The section has been successfully created.',
    type: DiaryAikoSection,
  })
  create(@Body() createDto: CreateDiaryAikoSectionDto): Promise<DiaryAikoSection> {
    return this.diaryAikoService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Diary Aiko sections' })
  @ApiResponse({ status: 200, description: 'Return all sections.', type: [DiaryAikoSection] })
  findAll(): Promise<DiaryAikoSection[]> {
    return this.diaryAikoService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get a Diary Aiko section by uuid' })
  @ApiResponse({ status: 200, description: 'Return the section.', type: DiaryAikoSection })
  @ApiResponse({ status: 404, description: 'Section not found' })
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<DiaryAikoSection> {
    return this.diaryAikoService.findOne(uuid);
  }

  @Put(':uuid')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Update a Diary Aiko section' })
  @ApiResponse({
    status: 200,
    description: 'The section has been successfully updated.',
    type: DiaryAikoSection,
  })
  @ApiResponse({ status: 404, description: 'Section not found' })
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateDto: UpdateDiaryAikoSectionDto,
  ): Promise<DiaryAikoSection> {
    return this.diaryAikoService.update(uuid, updateDto);
  }

  @Delete(':uuid')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Delete a Diary Aiko section' })
  @ApiResponse({ status: 200, description: 'The section has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Section not found' })
  remove(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return this.diaryAikoService.remove(uuid);
  }
}
