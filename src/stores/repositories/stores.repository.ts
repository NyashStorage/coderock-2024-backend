import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import StoreEntity from '../entities/store.entity';
import StoreType from '../types/enums/store-type.enum';
import OffsetableQuery from '../../app/dto/offsetable-query';

@Injectable()
export default class StoresRepository {
  public constructor(
    @InjectRepository(StoreEntity)
    private readonly repo: Repository<StoreEntity>,
  ) {}

  public create(
    entity: Omit<StoreEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<StoreEntity> {
    const createdEntity = new StoreEntity();
    Object.assign(createdEntity, entity);

    return this.repo.save(createdEntity);
  }

  public getById(id: number): Promise<StoreEntity | null> {
    return this.repo
      .createQueryBuilder('stores')
      .leftJoinAndSelect('stores.owner', 'owners')
      .where('stores.id = :id', { id })
      .getOne();
  }

  public getAll(query: OffsetableQuery): Promise<[StoreEntity[], number]> {
    return this.repo
      .createQueryBuilder('stores')
      .leftJoinAndSelect('stores.owner', 'owners')
      .offset(query.offset)
      .limit(query.limit)
      .orderBy('stores.id', 'DESC')
      .getManyAndCount();
  }

  public getByOwner(
    ownerId: number,
    query: OffsetableQuery,
  ): Promise<[StoreEntity[], number]> {
    return this.repo
      .createQueryBuilder('stores')
      .leftJoinAndSelect('stores.owner', 'owners')
      .where('owners.id = :id', { id: ownerId })
      .offset(query.offset)
      .limit(query.limit)
      .orderBy('stores.id', 'DESC')
      .getManyAndCount();
  }

  public getByAddressAndType(
    address: string,
    type: StoreType,
  ): Promise<StoreEntity[]> {
    return this.repo
      .createQueryBuilder('stores')
      .leftJoinAndSelect('stores.owner', 'owners')
      .where('stores.address = :address', { address })
      .andWhere('stores.type = :type', { type })
      .getMany();
  }

  public async delete(id: number): Promise<void> {
    await this.repo.delete({
      id,
    });
  }
}
