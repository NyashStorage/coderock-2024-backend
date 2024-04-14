import { AutoMap } from 'automapper-classes';
import type ProductProperties from '../../types/interfaces/product-properties.interface';
import CategoryResponse from '../../../categories/dto/responses/category.response';

export default class MyProductResponse {
  @AutoMap()
  id: number;

  @AutoMap()
  title: string;

  @AutoMap()
  description: string;

  @AutoMap()
  photo: string;

  @AutoMap()
  price: number;

  @AutoMap(() => Object)
  properties: ProductProperties;

  category: CategoryResponse;

  @AutoMap()
  enabled: boolean;

  @AutoMap(() => Object)
  amount: Record<number, number>;
}
