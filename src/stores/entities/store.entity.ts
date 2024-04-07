import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AutoMap } from 'automapper-classes';
import StoreType from '../types/enums/store-type.enum';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
