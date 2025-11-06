import { ApiProperty } from '@nestjs/swagger';

export class FileResponse {
  @ApiProperty({ example: true, description: 'Indicates if the upload was successful' })
  success: boolean;
  @ApiProperty({ example: 'Archivo subido exitosamente', description: 'Response message' })
  message: string;
  @ApiProperty({ example: '1699281234567-123456789.jpg', description: 'Stored filename' })
  filename: string;
  @ApiProperty({
    example: '/files/image/1699281234567-123456789.jpg',
    description: 'Public URL to access the file',
  })
  url: string;
  @ApiProperty({ example: 1024000, description: 'File size in bytes' })
  size: number;
  @ApiProperty({ example: 'image', description: 'File category based on MIME type' })
  category: string;
}
export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: unknown;
}
