import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import UserEntity from '../users/entities/user.entity';
import CreateStoreRequest from './dto/requests/create-store.request';
import StoreEntity from './entities/store.entity';
import StoresRepository from './repositories/stores.repository';
import { StoreEntitiesResponse } from './dto/responses/stores.response';
import OffsetableQuery from '../app/dto/offsetable-query';

@Injectable()
export default class StoresService {
  constructor(private readonly storesRepository: StoresRepository) {}

  /**
   * @throws BadRequestException Подобная точка уже существует.
   */
  public async create(
    user: UserEntity,
    dto: CreateStoreRequest,
  ): Promise<StoreEntity> {
    const stores = await this.storesRepository.getByAddressAndType(
      dto.address,
      dto.type,
    );

    const userStores = stores.filter((store) => store?.owner.id === user.id);

    if (userStores.length)
      throw new BadRequestException(
        'Точка в этом городе с таким типом уже существует.',
      );

    return this.storesRepository.create({
      ...dto,
      owner: user,
    });
  }

  public async getList(
    user: UserEntity,
    query: OffsetableQuery,
  ): Promise<StoreEntitiesResponse> {
    const [stores, total] = await this.storesRepository.getByOwner(
      user.id,
      query,
    );

    return new StoreEntitiesResponse(stores, total);
  }

  /**
   * @throws BadRequestException Точка не существует или не принадлежит пользователю.
   */
  public async delete(user: UserEntity, id: number): Promise<void> {
    const store = await this.storesRepository.getById(id);

    if (!store || store.owner.id !== user.id)
      throw new NotFoundException('Точка не найдена или не принадлежит вам.');

    await this.storesRepository.delete(id);
  }
}
