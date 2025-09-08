import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import config from 'src/config/configuration';
import { PayloadToken } from '../../libs/Auth/token';

import { UsersService } from '../../users/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(config.KEY) configService: ConfigType<typeof config>,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwt.secret,
    });
  }

  async validate(payload: PayloadToken): Promise<PayloadToken> {
    if (payload === null) {
      throw new UnauthorizedException('Token not found');
    }
    console.log(payload);
    const user = await this.userService.validateUser(payload.uuid);

    if (!user) {
      throw new UnauthorizedException('Token Invalid');
    }

    if (payload.sessionUUID !== user.deviceJWT) {
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
