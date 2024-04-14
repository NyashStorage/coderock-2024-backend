import { Injectable } from '@nestjs/common';
import OffsetableQuery from '../app/dto/offsetable-query';
import CategoriesRepository from './repositories/categories.repository';
import { CategoryEntitiesResponse } from './dto/responses/categories.response';

@Injectable()
export default class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  public async getList(
    query: OffsetableQuery,
  ): Promise<CategoryEntitiesResponse> {
    const [categories, total] = await this.categoriesRepository.getList(query);

    return new CategoryEntitiesResponse(categories, total);
  }
}
