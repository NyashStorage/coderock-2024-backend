import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductsController from './products.controller';
import ProductsService from './products.service';
import ProductsRepository from './repositories/products.repository';
import ProductProfile from './profiles/product.profile';
import ProductEntity from './entities/product.entity';
import CategoriesModule from '../categories/categories.module';
import StoresModule from '../stores/stores.module';

@Module({
  imports: [
    CategoriesModule,
    StoresModule,
    TypeOrmModule.forFeature([ProductEntity]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, ProductProfile],
  exports: [ProductsService, ProductsRepository, ProductProfile],
})
export default class ProductsModule {}
