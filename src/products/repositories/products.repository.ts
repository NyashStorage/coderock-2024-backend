import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import OffsetableQuery from '../../app/dto/offsetable-query';
import ProductEntity from '../entities/product.entity';

@Injectable()
export default class ProductsRepository {
  public constructor(
    @InjectRepository(ProductEntity)
    private readonly repo: Repository<ProductEntity>,
  ) {}

  public create(
    entity: Omit<ProductEntity, 'id' | 'enabled' | 'createdAt' | 'updatedAt'>,
  ): Promise<ProductEntity> {
    const createdEntity = new ProductEntity();
    Object.assign(createdEntity, entity);

    return this.repo.save(createdEntity);
  }

  public getList(query: OffsetableQuery): Promise<[ProductEntity[], number]> {
    return this.repo
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.owner', 'owners')
      .leftJoinAndSelect('products.category', 'categories')
      .offset(query.offset)
      .limit(query.limit)
      .orderBy('products.id', 'DESC')
      .getManyAndCount();
  }

  public getById(id: number): Promise<ProductEntity | null> {
    return this.repo
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.owner', 'owners')
      .leftJoinAndSelect('products.stores', 'stores')
      .leftJoinAndSelect('products.category', 'categories')
      .where('products.id = :id', { id })
      .getOne();
  }

  public getByOwner(
    ownerId: number,
    query: OffsetableQuery,
  ): Promise<[ProductEntity[], number]> {
    return this.repo
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.owner', 'owners')
      .leftJoinAndSelect('products.category', 'categories')
      .where('owners.id = :id', { id: ownerId })
      .offset(query.offset)
      .limit(query.limit)
      .orderBy('products.id', 'DESC')
      .getManyAndCount();
  }

  public async update(
    id: number,
    data: DeepPartial<ProductEntity>,
  ): Promise<void> {
    if (data.stores) {
      const product = await this.getById(id);

      await this.repo
        .createQueryBuilder()
        .relation(ProductEntity, 'stores')
        .of(product)
        .remove(product?.stores || []);

      await this.repo
        .createQueryBuilder()
        .relation(ProductEntity, 'stores')
        .of(product)
        .remove(data.stores);

      delete data.stores;
    }

    await this.repo.update(id, data);
  }

  public async delete(id: number): Promise<void> {
    await this.repo.delete({
      id,
    });
  }
}
