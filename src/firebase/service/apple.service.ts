import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
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

@Injectable()
export class AppleService {
  private readonly logger = new Logger(AppleService.name);
  private readonly client: jwksClient.JwksClient;

  constructor(@Inject(configuration.KEY) private configService: ConfigType<typeof configuration>) {
    this.client = jwksClient({
      jwksUri: 'https://appleid.apple.com/auth/keys',
      cache: true,
      cacheMaxAge: 86400000,
    });
  }

  async verifyAppleToken(identityToken: string): Promise<AppleTokenPayload> {
    try {
      const decoded = jwt.decode(identityToken, { complete: true }) as jwt.Jwt | null;
      if (!decoded || !decoded.header) {
        throw new BadRequestException('Invalid Apple identity token format');
      }

      const kid = decoded.header.kid;
      if (!kid) {
        throw new BadRequestException('Apple identity token missing kid header');
      }

      const signingKey = await this.client.getSigningKey(kid);
      const publicKey = signingKey.getPublicKey();

      const allowedAudiences = [
        this.configService.apple.clientId,
        this.configService.apple.clientIdAndroid,
      ].filter((audience): audience is string => Boolean(audience));

      if (allowedAudiences.length === 0) {
        throw new Error('No Apple client IDs configured');
      }

      const payload = jwt.verify(identityToken, publicKey, {
        algorithms: ['RS256'],
        issuer: 'https://appleid.apple.com',
        audience: allowedAudiences as [string, ...string[]],
      }) as unknown as AppleTokenPayload;

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
