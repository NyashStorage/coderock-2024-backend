import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MapInterceptor } from 'automapper-nestjs';
import RouteResponse from './dto/responses/route.response';
import RequireAuthorization from '../auth/decorators/require-authorization.decorator';
import RoutesService from './routes.service';
import RouteEntity from './entities/route.entity';
import CreateRouteRequest from './dto/requests/create-route.request';
import User from '../users/decorators/user.decorator';
import UserEntity from '../users/entities/user.entity';
import OffsetableQuery from '../app/dto/offsetable-query';
import RoutesResponse, {
  RouteEntitiesResponse,
} from './dto/responses/routes.response';

export interface RouteQuery {
  type: 'самый быстрый' | 'самый дешёвый' | 'короткий маршрут';
  to: number;
}

@Controller('routes')
export default class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @RequireAuthorization()
  @Post()
  @UseInterceptors(MapInterceptor(RouteEntity, RouteResponse))
  create(
    @User() user: UserEntity,
    @Body() dto: CreateRouteRequest,
  ): Promise<RouteEntity> {
    return this.routesService.create(user, dto);
  }

  @Get(':id')
  getRoute(
    @Param('id') productId: number,
    @Query()
    query: RouteQuery,
  ): Promise<any> {
    return this.routesService.getRoute(productId, query);
  }

  @RequireAuthorization()
  @Get()
  @UseInterceptors(MapInterceptor(RouteEntitiesResponse, RoutesResponse))
  getList(
    @User() user: UserEntity,
    @Query() query: OffsetableQuery,
  ): Promise<RouteEntitiesResponse> {
    return this.routesService.getList(user, query);
  }

  @RequireAuthorization()
  @Delete(':id')
  async delete(
    @User() user: UserEntity,
    @Param('id') id: number,
  ): Promise<void> {
    await this.routesService.delete(user, id);
  }
}
