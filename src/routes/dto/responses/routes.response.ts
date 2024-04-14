import { AutoMap } from 'automapper-classes';
import type { ListResponse } from '../../../app/dto/responses/list.response';
import RouteEntity from '../../entities/route.entity';
import RouteResponse from './route.response';

export class RouteEntitiesResponse implements ListResponse<RouteEntity> {
  @AutoMap(() => RouteEntity)
  items: RouteEntity[];

  @AutoMap()
  total: number;

  constructor(items: RouteEntity[], total: number) {
    this.items = items;
    this.total = total;
  }
}

export default class RoutesResponse implements ListResponse<RouteResponse> {
  @AutoMap(() => RouteResponse)
  items: RouteResponse[];

  @AutoMap()
  total: number;
}
