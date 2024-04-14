import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { MapInterceptor } from 'automapper-nestjs';
import CategoriesService from './categories.service';
import OffsetableQuery from '../app/dto/offsetable-query';
import CategoriesResponse, {
  CategoryEntitiesResponse,
} from './dto/responses/categories.response';

@Controller('categories')
export default class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @UseInterceptors(MapInterceptor(CategoryEntitiesResponse, CategoriesResponse))
  getList(@Query() query: OffsetableQuery): Promise<CategoriesResponse> {
    return this.categoriesService.getList(query);
  }
}
