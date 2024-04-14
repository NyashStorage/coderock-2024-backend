import { AutomapperProfile, InjectMapper } from 'automapper-nestjs';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { Mapper } from 'automapper-core';
import { createMap } from 'automapper-core';
import { Injectable } from '@nestjs/common';
import StoreEntity from '../entities/store.entity';
import StoreResponse from '../dto/responses/store.response';
import StoresResponse, {
  StoreEntitiesResponse,
} from '../dto/responses/stores.response';

@Injectable()
export default class StoreProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper): void => {
      createMap(mapper, StoreEntity, StoreResponse);
      createMap(mapper, StoreEntitiesResponse, StoresResponse);
    };
  }
}
