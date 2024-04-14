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
import StoreResponse from './dto/responses/store.response';
import RequireAuthorization from '../auth/decorators/require-authorization.decorator';
import StoresService from './stores.service';
import StoreEntity from './entities/store.entity';
import CreateStoreRequest from './dto/requests/create-store.request';
import User from '../users/decorators/user.decorator';
import UserEntity from '../users/entities/user.entity';
import StoresResponse, {
  StoreEntitiesResponse,
} from './dto/responses/stores.response';
import OffsetableQuery from '../app/dto/offsetable-query';

@RequireAuthorization()
@Controller('stores')
export default class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @UseInterceptors(MapInterceptor(StoreEntity, StoreResponse))
  create(
    @User() user: UserEntity,
    @Body() dto: CreateStoreRequest,
  ): Promise<StoreEntity> {
    return this.storesService.create(user, dto);
  }

  @Get()
  @UseInterceptors(MapInterceptor(StoreEntitiesResponse, StoresResponse))
  getList(
    @User() user: UserEntity,
    @Query() query: OffsetableQuery,
  ): Promise<StoreEntitiesResponse> {
    return this.storesService.getList(user, query);
  }

  @Delete(':id')
  async delete(
    @User() user: UserEntity,
    @Param('id') id: number,
  ): Promise<void> {
    await this.storesService.delete(user, id);
  }
}
