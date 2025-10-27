import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../../users/enum/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnum[]): ReturnType<typeof SetMetadata> =>
  SetMetadata(ROLES_KEY, roles);
