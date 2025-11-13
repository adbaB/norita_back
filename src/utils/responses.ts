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

  @ApiProperty({ description: 'refresh token', type: String })
  refreshToken?: string;
}

export class LoginResponse {
  @ApiProperty({ description: 'status code', type: Number })
  status: number;

  @ApiProperty({ description: 'message', type: String })
  message: string;

  @ApiProperty({ description: 'json data', type: Object })
  data: {
    accessToken: string;
    refreshToken: string;
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

export class DeleteResponse {
  @ApiProperty({ description: 'status code', type: Number })
  status: number;

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

export class ApiResponse<T> {
  @ApiProperty({ example: true, description: 'Indicates if the request was successful' })
  public success: boolean;

  @ApiProperty({ example: 'Success', description: 'Response message' })
  public message: string;

  @ApiProperty({ description: 'Response data' })
  public data: T;

  @ApiProperty({ example: new Date().toISOString(), description: 'Timestamp of the response' })
  public timestamp: string = new Date().toISOString();

  constructor(
    success: boolean,
    message: string,
    data: T,
    timestamp: string = new Date().toISOString(),
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.timestamp = timestamp;
  }
}

export class PaginatedResponse<T> extends ApiResponse<T> {
  constructor(
    success: boolean,
    message: string,
    data: T,
    public info: {
      total: number;
      currentPage: number;
      nextPage: number | null;
      prevPage: number | null;
      lastPage: number;
    },
  ) {
    super(success, message, data);
  }
}
