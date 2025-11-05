import { ApiProperty } from '@nestjs/swagger';

export class FileResponse {
  success: boolean;
  message: string;
  filename: string;
  url: string;
  size: number;
  category: string;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: unknown;
}
