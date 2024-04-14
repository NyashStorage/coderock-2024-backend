import { AutoMap } from 'automapper-classes';
import type { ListResponse } from '../../../app/dto/responses/list.response';
import MyProductResponse from './my-product.response';

export default class MyProductsResponse
  implements ListResponse<MyProductResponse>
{
  @AutoMap(() => MyProductResponse)
  items: MyProductResponse[];

  @AutoMap()
  total: number;
}
