import { AutoMap } from 'automapper-classes';
import type ProductProperties from '../../types/interfaces/product-properties.interface';
import CategoryResponse from '../../../categories/dto/responses/category.response';
import CompanyUserResponse from '../../../users/dto/responses/company-user.response';

export default class ProductResponse {
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

  owner: CompanyUserResponse;
}
