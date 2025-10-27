import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BibliographyDTO {
  @ApiProperty({
    description: 'Content of the lesson',
    nullable: false,
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'content should not be empty' })
  @IsString({ message: 'content must be a string' })
  content: string;

  @ApiProperty({
    description: 'Audio of the lesson',
    nullable: true,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'audio must be a string' })
  audio?: string;
}
