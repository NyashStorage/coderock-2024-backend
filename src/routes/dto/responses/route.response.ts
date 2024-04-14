import { AutoMap } from 'automapper-classes';
import RouteType from '../../types/enums/route-type.enum';
import StoreResponse from '../../../stores/dto/responses/store.response';

export default class RouteResponse {
  @AutoMap()
  id: number;

  @AutoMap()
  distance: number;

  @AutoMap()
  time: number;

  @AutoMap()
  price: number;

  @AutoMap()
  type: RouteType;

  from: StoreResponse;

  to: StoreResponse;
}
