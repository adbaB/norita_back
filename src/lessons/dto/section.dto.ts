import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSectionDto {
  @ApiProperty({
    description: 'name of the section',
    nullable: false,
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'order of the section',
    nullable: false,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  order: number;
}

export class UpdateSectionDTO extends PartialType(CreateSectionDto) {}
