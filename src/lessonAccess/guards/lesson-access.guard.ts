import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { LessonAccessService } from '../services/lesson-access.service';

@Injectable()
export class LessonAccessGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly lessonAccessService: LessonAccessService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params, user } = context.switchToHttp().getRequest();

    if (!params.uuid || !user?.uuid) {
      return false;
    }

    // Fetch user to check premium status
    const fullUser = await this.usersService.findByUUID(user.uuid);

    // Premium users always have access
    if (fullUser?.isPremium) {
      return true;
    }

    // Non-premium users: check if they have an unlocked access record
    const isUnlocked = await this.lessonAccessService.isLessonUnlocked(user.uuid, params.uuid);

    if (!isUnlocked) {
      throw new ForbiddenException('You do not have access to this lesson');
    }

    return true;
  }
}
