import { AutoMap } from 'automapper-classes';
import StoreType from '../../types/enums/store-type.enum';

export default class StoreResponse {
  @AutoMap()
  id: number;

  @AutoMap()
  address: string;

  @AutoMap()
  type: StoreType;
}
