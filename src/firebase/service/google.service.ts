import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import configuration from 'src/config/configuration';

@Injectable()
export class GoogleService {
  private googleClient: OAuth2Client;

  constructor(@Inject(configuration.KEY) private configService: ConfigType<typeof configuration>) {
    this.googleClient = new OAuth2Client();
  }

  async verifyGoogleToken(token: string): Promise<TokenPayload> {
    const allowedAudiences = [
      this.configService.google.client,
      this.configService.google.clientAndroid,
      this.configService.google.clientIos,
    ].filter(Boolean);

    const ticket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: allowedAudiences,
    });
    const payloadGoogle = ticket.getPayload();
    if (!payloadGoogle || !payloadGoogle.email_verified) {
      throw new BadRequestException('Invalid Google token');
    }
    return payloadGoogle;
  }
}
