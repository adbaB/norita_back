import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import * as jwksClient from 'jwks-rsa';
import configuration from 'src/config/configuration';

export interface AppleTokenPayload {
  iss: string;
  aud: string;
  exp: number;
  iat: number;
  sub: string;
  email: string;
  email_verified: string | boolean;
  is_private_email?: string | boolean;
  nonce?: string;
  nonce_supported?: boolean;
}

export interface DecodedAppleToken {
  header: {
    kid?: string;
    alg?: string;
    [key: string]: unknown;
  };
  payload: AppleTokenPayload;
  signature: string;
}

@Injectable()
export class AppleService {
  private readonly logger = new Logger(AppleService.name);
  private readonly client: jwksClient.JwksClient;

  constructor(
    @Inject(configuration.KEY) private configService: ConfigType<typeof configuration>,
    private readonly jwtService: JwtService,
  ) {
    this.client = jwksClient({
      jwksUri: 'https://appleid.apple.com/auth/keys',
      cache: true,
      cacheMaxAge: 86400000,
    });
  }

  async verifyAppleToken(identityToken: string): Promise<AppleTokenPayload> {
    try {
      const decodedHeader = this.jwtService.decode(identityToken, {
        complete: true,
      }) as DecodedAppleToken | null;
      if (!decodedHeader || typeof decodedHeader === 'string' || !decodedHeader.header) {
        throw new BadRequestException('Invalid Apple identity token format');
      }

      const kid = decodedHeader.header.kid;
      if (!kid) {
        throw new BadRequestException('Apple identity token missing kid header');
      }

      const signingKey = await this.client.getSigningKey(kid);
      const publicKey = signingKey.getPublicKey();

      const allowedAudiences = [
        this.configService.apple.clientId,
        this.configService.apple.clientIdAndroid,
      ].filter((audience): audience is string => Boolean(audience));

      const verifyOptions: JwtVerifyOptions = {
        algorithms: ['RS256'],
        secret: publicKey,
        issuer: 'https://appleid.apple.com',
        audience: allowedAudiences,
      };

      const payload = this.jwtService.verify<AppleTokenPayload>(identityToken, verifyOptions);

      const emailVerified = payload.email_verified === true || payload.email_verified === 'true';

      if (!payload.email || !emailVerified) {
        throw new BadRequestException('Apple token email not verified');
      }

      return payload;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      this.logger.error('Apple token verification failed', error);
      throw new BadRequestException('Invalid Apple identity token');
    }
  }
}
