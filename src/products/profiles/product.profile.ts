import { AutomapperProfile, InjectMapper } from 'automapper-nestjs';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { Mapper } from 'automapper-core';
import { afterMap, createMap } from 'automapper-core';
import { Injectable } from '@nestjs/common';
import ProductEntity from '../entities/product.entity';
import ProductResponse from '../dto/responses/product.response';
import ProductsResponse, {
  ProductEntitiesResponse,
} from '../dto/responses/products.response';
import MyProductResponse from '../dto/responses/my-product.response';
import MyProductsResponse from '../dto/responses/my-products.response';
import CategoryEntity from '../../categories/entities/category.entity';
import CategoryResponse from '../../categories/dto/responses/category.response';
import UserEntity from '../../users/entities/user.entity';
import CompanyUserResponse from '../../users/dto/responses/company-user.response';

@Injectable()
export default class ProductProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper): void => {
      createMap(
        mapper,
        ProductEntity,
        ProductResponse,
        afterMap((source, destination) => {
          destination.category = this.mapper.map(
            source.category,
            CategoryEntity,
            CategoryResponse,
          );

          destination.owner = this.mapper.map(
            source.owner,
            UserEntity,
            CompanyUserResponse,
          );
        }),
      );
      createMap(
        mapper,
        ProductEntity,
        MyProductResponse,
        afterMap((source, destination) => {
          destination.category = this.mapper.map(
            source.category,
            CategoryEntity,
            CategoryResponse,
          );
        }),
      );
      createMap(mapper, ProductEntitiesResponse, ProductsResponse);
      createMap(mapper, ProductEntitiesResponse, MyProductsResponse);
    };
  }
}
