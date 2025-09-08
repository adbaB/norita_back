export class CreatedResponse<E> {
  status: number;
  message: string;
  data: E;
  accessToken?: string;
}

export class LoginResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
  };
}

export class UpdateResponse {
  status: number;
  message: string;
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
