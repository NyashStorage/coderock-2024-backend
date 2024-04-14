import { BadRequestException, Injectable } from '@nestjs/common';
import UserEntity from './entities/user.entity';
import EditUserRequest from './dto/requests/edit-user.request';
import UsersRepository from './repositories/users.repository';
import md5 from 'md5';
import { DeepPartial } from 'typeorm';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * @throws BadRequestException Ни одно поле данных не указано.
   */
  public async edit(
    user: UserEntity,
    dto: EditUserRequest,
  ): Promise<UserEntity> {
    if (!Object.keys(dto).length)
      throw new BadRequestException(
        'Необходимо указать хотя бы одно изменяемое поле.',
      );

    const data: DeepPartial<UserEntity> = {};
    data.profile = user.profile;

    if (dto.password) {
      data.password = md5(dto.password);
    }

    if (dto.firstName) {
      data.profile.firstName = dto.firstName;
    }

    if (dto.lastName) {
      data.profile.lastName = dto.lastName;
    }

    if (dto.companyName !== undefined) {
      data.profile.companyName = dto.companyName;
    }

    await this.usersRepository.update(user.id, data);
    return { ...user, ...data } as UserEntity;
  }
}
