import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import RouteEntity from '../entities/route.entity';
import RouteType from '../types/enums/route-type.enum';
import OffsetableQuery from '../../app/dto/offsetable-query';

@Injectable()
export default class RoutesRepository {
  public constructor(
    @InjectRepository(RouteEntity)
    private readonly repo: Repository<RouteEntity>,
  ) {}

  public create(
    entity: Omit<RouteEntity, 'id' | 'createdAt'>,
  ): Promise<RouteEntity> {
    const createdEntity = new RouteEntity();
    Object.assign(createdEntity, entity);

    return this.repo.save(createdEntity);
  }

  public getById(id: number): Promise<RouteEntity | null> {
    return this.repo
      .createQueryBuilder('routes')
      .leftJoinAndSelect('routes.owner', 'owners')
      .leftJoinAndSelect('routes.from', 'from')
      .leftJoinAndSelect('routes.to', 'to')
      .where('routes.id = :id', { id })
      .getOne();
  }

  public getAll(query: OffsetableQuery): Promise<[RouteEntity[], number]> {
    return this.repo
      .createQueryBuilder('routes')
      .leftJoinAndSelect('routes.owner', 'owners')
      .leftJoinAndSelect('routes.from', 'from')
      .leftJoinAndSelect('routes.to', 'to')
      .offset(query.offset)
      .limit(query.limit)
      .orderBy('routes.id', 'DESC')
      .getManyAndCount();
  }

  public getByOwner(
    ownerId: number,
    query: OffsetableQuery,
  ): Promise<[RouteEntity[], number]> {
    return this.repo
      .createQueryBuilder('routes')
      .leftJoinAndSelect('routes.owner', 'owners')
      .leftJoinAndSelect('routes.from', 'from')
      .leftJoinAndSelect('routes.to', 'to')
      .where('owners.id = :id', { id: ownerId })
      .offset(query.offset)
      .limit(query.limit)
      .orderBy('routes.id', 'DESC')
      .getManyAndCount();
  }

  public getByTypeAndLocation(
    type: RouteType,
    from: number,
    to: number,
  ): Promise<RouteEntity[]> {
    return this.repo
      .createQueryBuilder('routes')
      .leftJoinAndSelect('routes.owner', 'owners')
      .leftJoinAndSelect('routes.from', 'from')
      .leftJoinAndSelect('routes.to', 'to')
      .where('routes.type = :type', { type })
      .andWhere('from.id = :from', { from })
      .andWhere('to.id = :to', { to })
      .getMany();
  }

  public async delete(id: number): Promise<void> {
    await this.repo.delete({
      id,
    });
  }
}
