import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Note } from '../../interfaces/commons/note.interface';

export class NoteDTO implements Note {
  @IsString()
  @IsNotEmpty()
  note: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  order: number;
}
