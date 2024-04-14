import { AutoMap } from 'automapper-classes';
import type Profile from '../../types/interfaces/profile.interface';

export default class UserResponse {
  @AutoMap()
  id: number;

  @AutoMap()
  email: string;

  @AutoMap(() => Object)
  profile: Profile;
}
