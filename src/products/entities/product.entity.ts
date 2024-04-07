import type { Relation } from 'typeorm';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AutoMap } from 'automapper-classes';
import CategoryEntity from '../../categories/entities/category.entity';
import type ProductProperties from '../types/interfaces/product-properties.interface';
import StoreEntity from '../../stores/entities/store.entity';

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

  @ManyToOne(() => CategoryEntity)
  category: Relation<CategoryEntity>;

  @Column({
    type: 'blob',
    nullable: true,
  })
  @AutoMap()
  photo: Blob | null;

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
    nullable: true,
    comment: 'Дополнительные параметры продукта',
  })
  @AutoMap(() => Object)
  properties: ProductProperties | null;

  @ManyToMany(() => StoreEntity)
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
   * Количество продукта на складах в формате { [StoreEntity#id]: number }.
   */
  @Column({
    type: 'json',
    default: {},
    comment:
      'Количество продукта на складах в формате { [StoreEntity#id]: number }',
  })
  @AutoMap(() => Object)
  amount: Record<number, number>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt: Date | null;
}
