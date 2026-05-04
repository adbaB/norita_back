import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTypeStructureDto {
  @ApiProperty({
    description: 'Name of the type structure (e.g. Paragraph, Image)',
    type: String,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'name should not be empty' })
  @IsString({ message: 'name must be a string' })
  @MaxLength(100, { message: 'name must be at most 100 characters' })
  name: string;
}
