import {
  BadRequestException,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/role.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import { ApiResponse } from '../../utils/responses';
import { FileResponse, FileUploadDto } from '../dto/file.dto';
import { FileRandom } from '../entities/fileRandom.entity';
import { TypeFileEnum } from '../enums/type-file.enum';
import { FileService } from '../services/file.service';

@ApiBearerAuth()
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @Roles(RoleEnum.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Subir un archivo',
    type: FileUploadDto,
  })
  uploadFile(@UploadedFile() file: Express.Multer.File): ApiResponse<FileResponse> {
    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }
    const category = file.mimetype.split('/')[0];

    return new ApiResponse(true, 'file uploaded successfully', {
      filename: file.filename,
      url: `/files/${category}/${file.filename}`,
      size: file.size,
      category,
    });
  }

  @Post('upload/:type')
  @Roles(RoleEnum.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'type', required: true, description: 'Tipo de archivo', enum: TypeFileEnum })
  @ApiBody({
    description: 'Subir un archivo aleatorios',
    type: FileUploadDto,
  })
  async uploadFileRandom(
    @UploadedFile() file: Express.Multer.File,
    @Param('type') type: TypeFileEnum,
  ): Promise<ApiResponse<FileRandom>> {
    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }
    const category = file.mimetype.split('/')[0];
    const fileRandom = await this.fileService.createFileRandom(
      `/files/${category}/${file.filename}`,
      type,
    );
    return new ApiResponse(true, 'file uploaded successfully', fileRandom);
  }
}
