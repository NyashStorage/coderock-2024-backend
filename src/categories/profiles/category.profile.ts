import { AutomapperProfile, InjectMapper } from 'automapper-nestjs';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { Mapper } from 'automapper-core';
import { createMap } from 'automapper-core';
import { Injectable } from '@nestjs/common';
import CategoryEntity from '../entities/category.entity';
import CategoryResponse from '../dto/responses/category.response';
import CategoriesResponse, {
  CategoryEntitiesResponse,
} from '../dto/responses/categories.response';

@Injectable()
export default class CategoryProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper): void => {
      createMap(mapper, CategoryEntity, CategoryResponse);
      createMap(mapper, CategoryEntitiesResponse, CategoriesResponse);
    };
  }
}
