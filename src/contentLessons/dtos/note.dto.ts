import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class NoteDTO {
  @ApiProperty({
    description: 'Content of the note',
    nullable: false,
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'content should not be empty' })
  @IsString({ message: 'content must be a string' })
  content: string;

  @ApiProperty({
    description: 'Audio of the note',
    nullable: true,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'audio must be a string' })
  audio?: string;

  @ApiProperty({
    description: 'Order of the note',
    nullable: false,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'order must be a number' },
  )
  order: number;
}
