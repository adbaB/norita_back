import { ApiProperty } from '@nestjs/swagger';

export class CreatedResponse<E> {
  @ApiProperty({ description: 'status code', type: Number })
  status: number;

  @ApiProperty({ description: 'message', type: String })
  message: string;

  @ApiProperty({ type: Object })
  data: E;

  @ApiProperty({ description: 'access token', type: String })
  accessToken?: string;
}

export class LoginResponse {
  @ApiProperty({ description: 'status code', type: Number })
  status: number;

  @ApiProperty({ description: 'message', type: String })
  message: string;

  @ApiProperty({ description: 'json data', type: Object })
  data: {
    accessToken: string;
  };
}

export class UpdateResponse {
  @ApiProperty({ description: 'status code', type: Number })
  status: number;

  @ApiProperty({ description: 'message', type: String })
  message: string;

  @ApiProperty({ description: 'number of records affected' })
  affected: number;
}

interface infoFormat {
  total: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

export interface FormatResponse<T> {
  info: infoFormat | object;
  data: T[] | T | null;
}
