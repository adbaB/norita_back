import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import config from 'src/config/configuration';
import { PayloadToken } from '../../libs/Auth/token';

import { UsersService } from '../../users/services/users.service';

/**
 * The JwtStrategy is a passport strategy that verifies the authentication token.
 * It validates the provided payload and checks if the session is active on another device.
 */
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  /**
   * Constructor of the JwtStrategy.
   * @param {ConfigType<typeof config>} configService - The config service.
   * @param {UsersService} userService - The users service.
   */
  constructor(
    @Inject(config.KEY) configService: ConfigType<typeof config>,
    private readonly userService: UsersService,
  ) {
    super({
      /**
       * The function that extracts the JWT from the request.
       * In this case, the JWT is extracted from the x-refresh-token header.
       */
      jwtFromRequest: ExtractJwt.fromHeader('x-refresh-token'),
      /**
       * If the token has expired, the strategy will ignore the expiration and validate the token.
       * This is useful for testing purposes, but should not be used in production.
       */
      ignoreExpiration: false,
      /**
       * The secret key used to sign and verify the JWT.
       * This should be a secure key that is not exposed to anyone.
       */
      secretOrKey: configService.jwtRefresh.secret,
    });
  }

  /**
   * Validates the provided payload.
   * @throws {UnauthorizedException} if the token is not found.
   * @throws {UnauthorizedException} if the token is invalid.
   * @throws {ConflictException} if the session is active on another device.
   * @returns {Promise<PayloadToken>} - The validated payload.
   */
  async validate(payload: PayloadToken): Promise<PayloadToken> {
    if (payload === null) {
      /**
       * If the token is not found, throw an UnauthorizedException.
       */
      throw new UnauthorizedException('Token not found');
    }

    const user = await this.userService.validateUser(payload.uuid);

    if (!user) {
      /**
       * If the token is invalid, throw an UnauthorizedException.
       */
      throw new UnauthorizedException('Token Invalid');
    }

    if (payload.sessionUUID !== user.deviceJWT) {
      /**
       * If the session is active on another device, throw a ConflictException.
       * This is useful for security reasons, as it prevents a user from accessing the account from multiple devices at the same time.
       */
      throw new ConflictException(
        'The session is active on another device; therefore, it is closed for security reasons.',
        {
          description: 'reauthenticate',
        },
      );
    }

    return payload;
  }
}
