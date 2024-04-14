import type { MiddlewareConsumer } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import DatabaseModule from '../database/database.module';
import AuthModule from '../auth/auth.module';
import { RefreshTokensMiddleware } from '../tokens/middlewares/refresh-tokens.middleware';
import { DisableCacheMiddleware } from '../tokens/middlewares/disable-cache.middleware';
import { AutomapperModule } from 'automapper-nestjs';
import { classes } from 'automapper-classes';
import StoresModule from '../stores/stores.module';
import CategoriesModule from '../categories/categories.module';
import ProductsModule from '../products/products.module';
import RoutesModule from '../routes/routes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    DatabaseModule,
    AuthModule,
    StoresModule,
    CategoriesModule,
    ProductsModule,
    RoutesModule,
  ],
})
export default class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RefreshTokensMiddleware).forRoutes('*');
    consumer.apply(DisableCacheMiddleware).forRoutes('*');
  }
}
