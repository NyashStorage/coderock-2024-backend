import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MapInterceptor } from 'automapper-nestjs';
import ProductsService from './products.service';
import User from '../users/decorators/user.decorator';
import UserEntity from '../users/entities/user.entity';
import OffsetableQuery from '../app/dto/offsetable-query';
import RequireAuthorization from '../auth/decorators/require-authorization.decorator';
import ProductEntity from './entities/product.entity';
import ProductResponse from './dto/responses/product.response';
import CreateProductRequest from './dto/requests/create-product.request';
import ProductsResponse, {
  ProductEntitiesResponse,
} from './dto/responses/products.response';
import MyProductsResponse from './dto/responses/my-products.response';
import EditProductRequest from './dto/requests/edit-product.request';
import MyProductResponse from './dto/responses/my-product.response';

@Controller('products')
export default class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @RequireAuthorization()
  @Post()
  @UseInterceptors(MapInterceptor(ProductEntity, ProductResponse))
  create(
    @User() user: UserEntity,
    @Body() dto: CreateProductRequest,
  ): Promise<ProductEntity> {
    return this.productsService.create(user, dto);
  }

  @RequireAuthorization()
  @Get('my')
  @UseInterceptors(MapInterceptor(ProductEntitiesResponse, MyProductsResponse))
  getMy(
    @User() user: UserEntity,
    @Query() query: OffsetableQuery,
  ): Promise<ProductEntitiesResponse> {
    return this.productsService.getMy(user, query);
  }

  @Get()
  @UseInterceptors(MapInterceptor(ProductEntitiesResponse, ProductsResponse))
  getList(@Query() query: OffsetableQuery): Promise<ProductEntitiesResponse> {
    return this.productsService.getList(query);
  }

  @RequireAuthorization()
  @Put(':id')
  @UseInterceptors(MapInterceptor(ProductEntity, MyProductResponse))
  edit(
    @User() user: UserEntity,
    @Param('id') id: number,
    @Body() dto: EditProductRequest,
  ): Promise<ProductEntity> {
    return this.productsService.edit(user, id, dto);
  }

  @RequireAuthorization()
  @Delete(':id')
  async delete(
    @User() user: UserEntity,
    @Param('id') id: number,
  ): Promise<void> {
    await this.productsService.delete(user, id);
  }
}
