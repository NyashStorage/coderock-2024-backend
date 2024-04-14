import { AutoMap } from 'automapper-classes';
import type { ListResponse } from '../../../app/dto/responses/list.response';
import ProductResponse from './product.response';
import ProductEntity from '../../entities/product.entity';

export class ProductEntitiesResponse implements ListResponse<ProductEntity> {
  @AutoMap(() => ProductEntity)
  items: ProductEntity[];

  @AutoMap()
  total: number;

  constructor(items: ProductEntity[], total: number) {
    this.items = items;
    this.total = total;
  }
}

export default class ProductsResponse implements ListResponse<ProductResponse> {
  @AutoMap(() => ProductResponse)
  items: ProductResponse[];

  @AutoMap()
  total: number;
}
