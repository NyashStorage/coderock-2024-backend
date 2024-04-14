import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RoutesController from './routes.controller';
import RoutesService from './routes.service';
import RouteEntity from './entities/route.entity';
import RoutesRepository from './repositories/routes.repository';
import RouteProfile from './profiles/route.profile';
import StoresModule from '../stores/stores.module';
import ProductsModule from '../products/products.module';

@Module({
  imports: [
    ProductsModule,
    StoresModule,
    TypeOrmModule.forFeature([RouteEntity]),
  ],
  controllers: [RoutesController],
  providers: [RoutesService, RoutesRepository, RouteProfile],
  exports: [RoutesService, RoutesRepository, RouteProfile],
})
export default class RoutesModule {}
