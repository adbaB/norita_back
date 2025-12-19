import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { LibrarySectionUserService } from '../services/librarySectionUser.service';

@Injectable()
export class LibrarySectionUserGuard implements CanActivate {
  constructor(private readonly librarySectionUserService: LibrarySectionUserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params, user } = context.switchToHttp().getRequest();

    if (!params.uuid) {
      return false;
    }

    if (!user.uuid) {
      return false;
    }

    const sectionUser = await this.librarySectionUserService.findBySectionAndUser(
      params.uuid,
      user.uuid,
    );

    if (!sectionUser) {
      throw new UnauthorizedException('Unauthorized access to this section');
    }

    return Boolean(sectionUser);
  }
}
