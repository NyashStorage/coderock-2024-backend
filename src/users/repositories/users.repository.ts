import { Injectable } from '@nestjs/common';
import UserEntity from '../entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class UsersRepository {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  public create(
    entity: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserEntity> {
    const createdEntity = new UserEntity();
    Object.assign(createdEntity, entity);

    return this.repo.save(createdEntity);
  }

  public getById(id: number): Promise<UserEntity | null> {
    return this.repo
      .createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getOne();
  }

  public getByEmail(email: string): Promise<UserEntity | null> {
    return this.repo
      .createQueryBuilder('users')
      .where('users.email = :email', { email })
      .getOne();
  }

  public async update(
    id: number,
    data: DeepPartial<UserEntity>,
  ): Promise<void> {
    await this.repo.update(id, data);
  }
}
