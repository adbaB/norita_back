import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { StepImage } from '../../interfaces/commons/stepImage.interface';

export class StepImageDTO implements StepImage {
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'step must be a number' },
  )
  @IsNotEmpty()
  step: number;

  @IsString({ message: 'image must be a string' })
  @IsNotEmpty()
  image: string;
}
