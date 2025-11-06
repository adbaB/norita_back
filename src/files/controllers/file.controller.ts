import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/role.decorator';
import { RoleEnum } from '../../users/enum/role.enum';
import { FileResponse, FileUploadDto } from '../dto/file.dto';

@ApiBearerAuth()
@Controller('files')
export class FileController {
  @Post('upload')
  @Roles(RoleEnum.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Subir un archivo',
    type: FileUploadDto,
  })
  uploadFile(@UploadedFile() file: Express.Multer.File): FileResponse {
    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }
    const category = file.mimetype.split('/')[0];

    return {
      success: true,
      message: 'Archivo subido exitosamente',
      filename: file.filename,
      url: `/files/${category}/${file.filename}`,
      size: file.size,
      category,
    };
  }
}
