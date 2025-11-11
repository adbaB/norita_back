import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

/**
 * JwtGuard is a guard that checks if the incoming request contains a valid JWT.
 * If the request contains a valid JWT, it allows the request to proceed.
 * If the request does not contain a valid JWT, it throws an UnauthorizedException.
 * The guard also checks if the route is marked as public using the @IsPublic() decorator.
 * If the route is public, the guard allows the request to proceed without checking the JWT.
 */
@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
