import type { Relation } from 'type-check';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AutoMap } from 'automapper-classes';
import UserEntity from '../../users/entities/user.entity';
import RouteType from '../types/enums/route-type.enum';
import StoreEntity from '../../stores/entities/store.entity';

@Entity('routes')
export default class RouteEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  /**
   * Расстояние пути в километрах.
   */
  @Column({
    comment: 'Расстояние пути в километрах',
  })
  @AutoMap()
  distance: number;

  /**
   * Время прохождения пути в часах.
   */
  @Column({
    comment: 'Время прохождения пути в часах',
  })
  @AutoMap()
  time: number;

  /**
   * Стоимость прохождения пути в копейках.
   */
  @Column({
    comment: 'Стоимость прохождения пути в копейках',
  })
  @AutoMap()
  price: number;

  @Column({
    type: 'enum',
    enum: RouteType,
  })
  @AutoMap()
  type: RouteType;

  @ManyToOne(() => StoreEntity, { onDelete: 'CASCADE' })
  from: Relation<StoreEntity>;

  @ManyToOne(() => StoreEntity, { onDelete: 'CASCADE' })
  to: Relation<StoreEntity>;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  owner: Relation<UserEntity>;

  @CreateDateColumn()
  createdAt: Date;
}
