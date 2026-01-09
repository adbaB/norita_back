import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserImagesDto } from '../dto/userImages/create-userImages.dto';
import { UserImages } from '../entities/userImages.entity';
import { UserImagesService } from '../services/userImages.service';

@ApiTags('user-images')
@Controller('user-images')
export class UserImagesController {
  constructor(private readonly userImagesService: UserImagesService) {}

  @ApiResponse({
    status: 201,
    type: UserImages,
    description: 'User image created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: '5XX', description: 'Internal error' })
  @Post()
  async create(@Body() createUserImagesDto: CreateUserImagesDto): Promise<UserImages> {
    return this.userImagesService.create(createUserImagesDto);
  }

  @ApiResponse({
    status: 200,
    type: [UserImages],
    description: 'Success',
  })
  @ApiResponse({ status: '5XX', description: 'Internal error' })
  @Get()
  async findAll(): Promise<UserImages[]> {
    return this.userImagesService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'User image deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'User image not found' })
  @ApiResponse({ status: '5XX', description: 'Internal error' })
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string): Promise<void> {
    return this.userImagesService.remove(uuid);
  }
}
