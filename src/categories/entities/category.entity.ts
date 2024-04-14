import type { Relation } from 'typeorm';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AutoMap } from 'automapper-classes';
import ProductEntity from '../../products/entities/product.entity';

@Entity('categories')
export default class CategoryEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  title: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: Relation<ProductEntity[]>;

  @CreateDateColumn()
  createdAt: Date;
}
