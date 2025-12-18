import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { LibraryUserService } from '../services/libraryUser.service';

@Injectable()
export class LibraryUserGuard implements CanActivate {
  constructor(private readonly libraryUserService: LibraryUserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params, user } = context.switchToHttp().getRequest();

    if (!params.uuid) {
      return false;
    }

    if (!user.uuid) {
      return false;
    }

    const libraryUser = await this.libraryUserService.findByLibraryAndUser(params.uuid, user.uuid);

    if (!libraryUser) {
      throw new UnauthorizedException('Unauthorized access to library');
    }

    return Boolean(libraryUser);
  }
}
