import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Observable } from 'rxjs';
import configuration from '../../config/configuration';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(@Inject(configuration.KEY) private config: ConfigType<typeof configuration>) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization;
    if (!token || token !== this.config.revenueCat.token) {
      return false;
    }

    return true;
  }
}
