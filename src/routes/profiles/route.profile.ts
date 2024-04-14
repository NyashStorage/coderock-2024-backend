import { AutomapperProfile, InjectMapper } from 'automapper-nestjs';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { Mapper } from 'automapper-core';
import { afterMap, createMap } from 'automapper-core';
import { Injectable } from '@nestjs/common';
import RouteEntity from '../entities/route.entity';
import RouteResponse from '../dto/responses/route.response';
import RoutesResponse, {
  RouteEntitiesResponse,
} from '../dto/responses/routes.response';
import StoreResponse from '../../stores/dto/responses/store.response';
import StoreEntity from '../../stores/entities/store.entity';

@Injectable()
export default class RouteProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper): void => {
      createMap(
        mapper,
        RouteEntity,
        RouteResponse,
        afterMap((source, destination) => {
          destination.from = this.mapper.map(
            source.from,
            StoreEntity,
            StoreResponse,
          );

          destination.to = this.mapper.map(
            source.to,
            StoreEntity,
            StoreResponse,
          );
        }),
      );
      createMap(mapper, RouteEntitiesResponse, RoutesResponse);
    };
  }
}
