import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Note } from '../../interfaces/commons/note.interface';

export class NoteDTO implements Note {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  note: string;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}
