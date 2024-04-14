import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import UserEntity from '../users/entities/user.entity';
import CreateRouteRequest from './dto/requests/create-route.request';
import RouteEntity from './entities/route.entity';
import RoutesRepository from './repositories/routes.repository';
import OffsetableQuery from '../app/dto/offsetable-query';
import StoresRepository from '../stores/repositories/stores.repository';
import StoreEntity from '../stores/entities/store.entity';
import StoreType from '../stores/types/enums/store-type.enum';
import { RouteEntitiesResponse } from './dto/responses/routes.response';
import ProductsRepository from '../products/repositories/products.repository';
import { RouteQuery } from './routes.controller';
import Graph from 'graphology';
import { dijkstra } from 'graphology-shortest-path';

@Injectable()
export default class RoutesService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly storesRepository: StoresRepository,
    private readonly routesRepository: RoutesRepository,
  ) {}

  /**
   * @throws BadRequestException Подобный маршрут уже существует.
   */
  public async create(
    user: UserEntity,
    dto: CreateRouteRequest,
  ): Promise<RouteEntity> {
    const fromStore = await this.validateStore(dto.from, user.id);
    const toStore = await this.validateStore(dto.to, user.id);

    if (fromStore.id === toStore.id)
      throw new BadRequestException(
        'Склад отправки и склад назначения не должны совпадать.',
      );

    const stores = await this.routesRepository.getByTypeAndLocation(
      dto.type,
      dto.from,
      dto.to,
    );

    const userStores = stores.filter((store) => store?.owner.id === user.id);

    if (userStores.length)
      throw new BadRequestException(
        'Подобный маршрут между этими городами уже существует.',
      );

    return this.routesRepository.create({
      ...dto,
      owner: user,
      from: fromStore,
      to: toStore,
    });
  }

  public async getList(
    user: UserEntity,
    query: OffsetableQuery,
  ): Promise<RouteEntitiesResponse> {
    const [routes, total] = await this.routesRepository.getByOwner(
      user.id,
      query,
    );

    return new RouteEntitiesResponse(routes, total);
  }

  public async getRoute(productId: number, query: RouteQuery): Promise<any> {
    const product = await this.productsRepository.getById(productId);
    const to = await this.storesRepository.getById(query.to);

    console.log(product);

    const [stores] = await this.storesRepository.getAll({
      limit: 999,
      offset: 0,
    });

    const distanceGraph = new Graph();
    const timeGraph = new Graph();
    const priceGraph = new Graph();

    for (const store of stores) {
      try {
        distanceGraph.addNode(store.address);
        timeGraph.addNode(store.address);
        priceGraph.addNode(store.address);
      } catch (e) {}
    }

    const [routes] = await this.routesRepository.getAll({
      limit: 999,
      offset: 0,
    });

    for (const route of routes) {
      distanceGraph.addDirectedEdge(route.from.address, route.to.address, {
        distance: route.distance,
      });

      timeGraph.addDirectedEdge(route.from.address, route.to.address, {
        distance: route.time,
      });

      priceGraph.addDirectedEdge(route.from.address, route.to.address, {
        distance: route.price,
      });
    }

    switch (query.type) {
      case 'самый быстрый':
        return dijkstra.bidirectional(
          timeGraph,
          product?.stores[0].address,
          to?.address,
        );

      case 'самый дешёвый':
        return dijkstra.bidirectional(
          priceGraph,
          product?.stores[0].address,
          to?.address,
        );

      case 'короткий маршрут':
        return dijkstra.bidirectional(
          distanceGraph,
          product?.stores[0].address,
          to?.address,
        );
    }
  }

  /**
   * @throws BadRequestException Маршрут не существует или не принадлежит пользователю.
   */
  public async delete(user: UserEntity, id: number): Promise<void> {
    const route = await this.routesRepository.getById(id);

    if (!route || route.owner.id !== user.id)
      throw new NotFoundException('Маршрут не найден или не принадлежит вам.');

    await this.routesRepository.delete(id);
  }

  /**
   * @throws NotFoundException Склад не найден или не принадлежит пользователю.
   */
  private async validateStore(
    storeId: number,
    userId: number,
  ): Promise<StoreEntity> {
    const store = await this.storesRepository.getById(storeId);

    if (!store || store.owner.id !== userId || store.type !== StoreType.Store)
      throw new NotFoundException(
        `Склад ${storeId} не найден или не принадлежит вам.`,
      );

    return store;
  }
}
