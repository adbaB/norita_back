import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { StepImage } from '../../interfaces/commons/stepImage.interface';

export class StepImageDTO implements StepImage {
  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    description: 'step',
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'step must be a number' },
  )
  @IsNotEmpty()
  step: number;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'image',
  })
  @IsString({ message: 'image must be a string' })
  @IsNotEmpty()
  image: string;
}
