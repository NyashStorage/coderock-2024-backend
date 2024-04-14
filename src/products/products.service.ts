import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import ProductsRepository from './repositories/products.repository';
import UserEntity from '../users/entities/user.entity';
import CreateProductRequest from './dto/requests/create-product.request';
import OffsetableQuery from '../app/dto/offsetable-query';
import { ProductEntitiesResponse } from './dto/responses/products.response';
import ProductEntity from './entities/product.entity';
import CategoriesRepository from '../categories/repositories/categories.repository';
import StoresRepository from '../stores/repositories/stores.repository';
import StoreType from '../stores/types/enums/store-type.enum';
import StoreEntity from '../stores/entities/store.entity';
import EditProductRequest from './dto/requests/edit-product.request';
import { DeepPartial } from 'typeorm';
import CategoryEntity from '../categories/entities/category.entity';

@Injectable()
export default class ProductsService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly storesRepository: StoresRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  /**
   * @throws NotFoundException Категория не найдена.
   * @throws NotFoundException Склад не найден или не принадлежит пользователю.
   */
  public async create(
    user: UserEntity,
    {
      title,
      description,
      photo,
      price,
      weight,
      length,
      height,
      depth,
      category: categoryId,
      amount,
    }: CreateProductRequest,
  ): Promise<ProductEntity> {
    const category = await this.categoriesRepository.getById(categoryId);
    if (!category) throw new NotFoundException('Категория не найдена.');

    const stores: StoreEntity[] = await this.validateStores(
      Object.keys(amount),
      user.id,
    );

    return this.productsRepository.create({
      title,
      description,
      photo,
      price,
      properties: {
        weight,
        length,
        height,
        depth,
      },
      category,
      stores,
      owner: user,
      amount,
    });
  }

  public async getMy(
    user: UserEntity,
    query: OffsetableQuery,
  ): Promise<ProductEntitiesResponse> {
    const [products, total] = await this.productsRepository.getByOwner(
      user.id,
      query,
    );

    return new ProductEntitiesResponse(products, total);
  }

  public async getList(
    query: OffsetableQuery,
  ): Promise<ProductEntitiesResponse> {
    const [products, total] = await this.productsRepository.getList(query);
    return new ProductEntitiesResponse(products, total);
  }

  /**
   * @throws BadRequestException Ни одно поле данных не указано.
   * @throws BadRequestException Товар не существует или не принадлежит пользователю.
   * @throws NotFoundException Категория не найдена.
   * @throws NotFoundException Склад не найден или не принадлежит пользователю.
   */
  public async edit(
    user: UserEntity,
    id: number,
    dto: EditProductRequest,
  ): Promise<ProductEntity> {
    if (!Object.keys(dto).length)
      throw new BadRequestException(
        'Необходимо указать хотя бы одно изменяемое поле.',
      );

    const product = await this.validateProduct(id, user.id);

    const data: DeepPartial<ProductEntity> = {};
    data.properties = product.properties;

    if (dto.title) data.title = dto.title;
    if (dto.description) data.description = dto.description;
    if (dto.photo) data.photo = dto.photo;
    if (dto.price !== undefined) data.price = dto.price;
    if (dto.weight !== undefined) data.properties.weight = dto.weight;
    if (dto.length !== undefined) data.properties.length = dto.length;
    if (dto.height !== undefined) data.properties.height = dto.height;
    if (dto.depth !== undefined) data.properties.depth = dto.depth;
    if (dto.category) data.category = await this.validateCategory(dto.category);
    if (dto.enabled !== undefined) data.enabled = dto.enabled;

    if (dto.amount) {
      data.amount = dto.amount;
      data.stores = await this.validateStores(Object.keys(dto.amount), user.id);
    }

    await this.productsRepository.update(product.id, data);
    return { ...product, ...data } as ProductEntity;
  }

  /**
   * @throws BadRequestException Товар не существует или не принадлежит пользователю.
   */
  public async delete(user: UserEntity, id: number): Promise<void> {
    await this.validateProduct(id, user.id);
    await this.productsRepository.delete(id);
  }

  /**
   * @throws BadRequestException Товар не существует или не принадлежит пользователю.
   */
  private async validateProduct(
    productId: number,
    userId: number,
  ): Promise<ProductEntity> {
    const product = await this.productsRepository.getById(productId);

    if (!product || product.owner.id !== userId)
      throw new NotFoundException('Товар не найден или не принадлежит вам.');

    return product;
  }

  /**
   * @throws NotFoundException Склад не найден или не принадлежит пользователю.
   */
  private async validateStores(
    storeIds: string[],
    userId: number,
  ): Promise<StoreEntity[]> {
    const stores: StoreEntity[] = [];

    for (const storeId of storeIds) {
      const store = await this.storesRepository.getById(+storeId);
      if (!store || store.owner.id !== userId || store.type !== StoreType.Store)
        throw new NotFoundException(
          `Склад ${storeId} не найден или не принадлежит вам.`,
        );

      stores.push(store);
    }

    return stores;
  }

  /**
   * @throws NotFoundException Категория не найдена.
   */
  private async validateCategory(categoryId: number): Promise<CategoryEntity> {
    const category = await this.categoriesRepository.getById(categoryId);
    if (!category) throw new NotFoundException('Категория не найдена.');

    return category;
  }
}
