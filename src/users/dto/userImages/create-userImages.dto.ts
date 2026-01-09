import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUserImagesDto {
  @ApiProperty({
    description: 'URL of the user image',
    nullable: false,
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl({ require_host: false })
  url: string;
}
