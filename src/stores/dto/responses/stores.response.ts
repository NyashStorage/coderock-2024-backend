import { AutoMap } from 'automapper-classes';
import type { ListResponse } from '../../../app/dto/responses/list.response';
import StoreEntity from '../../entities/store.entity';
import StoreResponse from './store.response';

export class StoreEntitiesResponse implements ListResponse<StoreEntity> {
  @AutoMap(() => StoreEntity)
  items: StoreEntity[];

  @AutoMap()
  total: number;

  constructor(items: StoreEntity[], total: number) {
    this.items = items;
    this.total = total;
  }
}

export default class StoresResponse implements ListResponse<StoreResponse> {
  @AutoMap(() => StoreResponse)
  items: StoreResponse[];

  @AutoMap()
  total: number;
}
