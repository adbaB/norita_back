import { User } from '../../users/entities/user.entity';

export interface RegisterInterface {
  user: User;
  accessToken: string;
  refreshToken: string;
}
