import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { User } from 'src/users/decorators/user.decorator';
import { RoleEnum } from 'src/users/enum/role.enum';
import { FormatResponse, PaginatedResponse } from 'src/utils/responses';
import { CreateDiaryAikoItemDto } from '../dto/create-diaryAikoItem.dto';
import { UpdateDiaryAikoItemDto } from '../dto/update-diaryAikoItem.dto';
import { DiaryAikoItem } from '../entities/diaryAikoItem.entity';
import { DiaryAikoItemResponse, DiaryAikoItemService } from '../services/diaryAikoItem.service';

@ApiTags('Diary Aiko Items')
@Controller('diary-aiko-items')
@ApiBearerAuth()
export class DiaryAikoItemController {
  constructor(private readonly diaryAikoItemService: DiaryAikoItemService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Create a new Diary Aiko item' })
  @ApiResponse({
    status: 201,
    description: 'The item has been successfully created.',
    type: DiaryAikoItem,
  })
  create(@Body() createDto: CreateDiaryAikoItemDto): Promise<DiaryAikoItem> {
    return this.diaryAikoItemService.create(createDto);
  }

  @Get('section/:sectionUuid')
  @ApiOperation({ summary: 'Get all Diary Aiko items for a specific section, paginated' })
  @ApiResponse({ status: 200, description: 'Return paginated items.' })
  async findAllBySection(
    @Param('sectionUuid', ParseUUIDPipe) sectionUuid: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @User('uuid') userUuid: string,
  ): Promise<FormatResponse<Record<string, unknown>>> {
    const itemsData = await this.diaryAikoItemService.findAllBySection(
      sectionUuid,
      limit,
      page,
      userUuid,
    );
    return new PaginatedResponse(
      true,
      'Items fetched successfully',
      itemsData.data,
      itemsData.info,
    );
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get a Diary Aiko item by uuid' })
  @ApiResponse({ status: 200, description: 'Return the item.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  findOne(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @User('uuid') userUuid: string,
  ): Promise<DiaryAikoItemResponse> {
    return this.diaryAikoItemService.findOne(uuid, userUuid);
  }

  @Patch('unlock/:uuid')
  @ApiOperation({ summary: 'Manually unlock a Diary Aiko item for the user' })
  @ApiResponse({ status: 200, description: 'Item unlocked successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async unlockItem(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @User('uuid') userUuid: string,
  ): Promise<{ success: boolean; message: string }> {
    await this.diaryAikoItemService.unlockItem(uuid, userUuid);
    return { success: true, message: 'Item unlocked successfully' };
  }

  @Put(':uuid')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Update a Diary Aiko item' })
  @ApiResponse({
    status: 200,
    description: 'The item has been successfully updated.',
    type: DiaryAikoItem,
  })
  @ApiResponse({ status: 404, description: 'Item not found' })
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateDto: UpdateDiaryAikoItemDto,
  ): Promise<DiaryAikoItem> {
    return this.diaryAikoItemService.update(uuid, updateDto);
  }

  @Delete(':uuid')
  @Roles(RoleEnum.ADMIN)
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a Diary Aiko item' })
  @ApiResponse({ status: 204, description: 'The item has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  remove(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return this.diaryAikoItemService.remove(uuid);
  }
}
