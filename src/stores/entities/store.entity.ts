import type { Relation } from 'type-check';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AutoMap } from 'automapper-classes';
import StoreType from '../types/enums/store-type.enum';
import UserEntity from '../../users/entities/user.entity';

@Entity('stores')
export default class StoreEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  address: string;

  @Column({
    type: 'enum',
    enum: StoreType,
  })
  @AutoMap()
  type: StoreType;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  owner: Relation<UserEntity>;

  @CreateDateColumn()
  createdAt: Date;
}
