import { AutoMap } from 'automapper-classes';
import type { ListResponse } from '../../../app/dto/responses/list.response';
import CategoryResponse from './category.response';
import CategoryEntity from '../../entities/category.entity';

export class CategoryEntitiesResponse implements ListResponse<CategoryEntity> {
  @AutoMap(() => CategoryEntity)
  items: CategoryEntity[];

  @AutoMap()
  total: number;

  constructor(items: CategoryEntity[], total: number) {
    this.items = items;
    this.total = total;
  }
}

export default class CategoriesResponse
  implements ListResponse<CategoryResponse>
{
  @AutoMap(() => CategoryResponse)
  items: CategoryResponse[];

  @AutoMap()
  total: number;
}
