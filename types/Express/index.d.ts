import { PayloadToken } from '../../src/libs/Auth/token';

declare namespace Express {
  export interface Request {
    user: PayloadToken;
  }
}
