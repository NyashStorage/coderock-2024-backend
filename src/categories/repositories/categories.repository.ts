import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import OffsetableQuery from '../../app/dto/offsetable-query';
import CategoryEntity from '../entities/category.entity';

@Injectable()
export default class CategoriesRepository {
  public constructor(
    @InjectRepository(CategoryEntity)
    private readonly repo: Repository<CategoryEntity>,
  ) {}

  public getList(query: OffsetableQuery): Promise<[CategoryEntity[], number]> {
    return this.repo
      .createQueryBuilder('categories')
      .offset(query.offset)
      .limit(query.limit)
      .orderBy('categories.id', 'DESC')
      .getManyAndCount();
  }

  public getById(id: number): Promise<CategoryEntity | null> {
    return this.repo
      .createQueryBuilder('categories')
      .where('categories.id = :id', { id })
      .getOne();
  }
}
