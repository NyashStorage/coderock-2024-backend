import type { DataSourceOptions } from 'typeorm';
import * as process from 'process';
import configuration from '../config/configuration';
import UserEntity from '../users/entities/user.entity';
import { AddUserEntity1712939875499 } from './migrations/1712939875499-AddUserEntity';
import StoreEntity from '../stores/entities/store.entity';
import { AddStoreEntity1712960824384 } from './migrations/1712960824384-AddStoreEntity';
import CategoryEntity from '../categories/entities/category.entity';
import { AddCategoryEntity1712971891361 } from './migrations/1712971891361-AddCategoryEntity';
import ProductEntity from '../products/entities/product.entity';
import { AddProductEntity1712975349003 } from './migrations/1712975349003-AddProductEntity';
import { ConfigureReferences1712977335623 } from './migrations/1712977335623-ConfigureReferences';
import { ChangeProductEntityAndStoreEntityRelation1712986038307 } from './migrations/1712986038307-ChangeProductEntityAndStoreEntityRelation';
import RouteEntity from '../routes/entities/route.entity';
import { AddRouteEntity1712994067613 } from './migrations/1712994067613-AddRouteEntity';

// Подгружаем данные из файла .env в process.env.
configuration();

const options: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  entities: [
    UserEntity,
    StoreEntity,
    CategoryEntity,
    ProductEntity,
    RouteEntity,
  ],
  migrations: [
    AddUserEntity1712939875499,
    AddStoreEntity1712960824384,
    AddCategoryEntity1712971891361,
    AddProductEntity1712975349003,
    ConfigureReferences1712977335623,
    ChangeProductEntityAndStoreEntityRelation1712986038307,
    AddRouteEntity1712994067613,
  ],
};

export default options;
