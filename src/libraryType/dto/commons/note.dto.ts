import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Note } from '../../interfaces/commons/note.interface';

export class NoteDTO implements Note {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'note',
  })
  @IsString()
  @IsNotEmpty()
  note: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    description: 'order',
    example: 1,
  })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}
