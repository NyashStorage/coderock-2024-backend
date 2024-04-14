import type { Relation } from 'typeorm';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AutoMap } from 'automapper-classes';
import type ProductProperties from '../types/interfaces/product-properties.interface';
import StoreEntity from '../../stores/entities/store.entity';
import CategoryEntity from '../../categories/entities/category.entity';
import UserEntity from '../../users/entities/user.entity';

@Entity('products')
export default class ProductEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  title: string;

  /**
   * @default пустая строка
   */
  @Column({
    default: '',
  })
  @AutoMap()
  description: string;

  @Column()
  @AutoMap()
  photo: string;

  /**
   * Стоимость в копейках.
   */
  @Column({
    comment: 'Стоимость в копейках',
  })
  @AutoMap()
  price: number;

  /**
   * Дополнительные параметры продукта.
   */
  @Column({
    type: 'json',
    comment: 'Дополнительные параметры продукта',
  })
  @AutoMap(() => Object)
  properties: ProductProperties;

  @ManyToOne(() => CategoryEntity, {
    onDelete: 'SET NULL',
  })
  category: Relation<CategoryEntity>;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  owner: Relation<UserEntity>;

  @ManyToMany(() => StoreEntity, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  stores: Relation<StoreEntity[]>;

  /**
   * Отображение продукта у покупателей.
   */
  @Column({
    default: true,
    comment: 'Отображение продукта у покупателе',
  })
  @AutoMap()
  enabled: boolean;

  /**
   * Количество продукта на складах в формате { [RouteEntity#id]: number }.
   */
  @Column({
    type: 'json',
    default: {},
    comment:
      'Количество продукта на складах в формате { [RouteEntity#id]: number }',
  })
  @AutoMap(() => Object)
  amount: Record<number, number>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
