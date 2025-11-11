export class PayloadToken {
  readonly uuid: string;
  readonly email: string;
  readonly role: string;
  readonly sessionUUID: string;
}

export class JwtTokenPayload {
  readonly uuid: string;
  readonly email: string;
  readonly role: string;
  readonly sessionUUID: string;
  readonly iat: number;
  readonly exp: number;
}
