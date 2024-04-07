import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AutoMap } from 'automapper-classes';
import type Profile from '../types/interfaces/profile.interface';

@Entity('users')
export default class UserEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Index({ unique: true })
  @Column({ unique: true })
  @AutoMap()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'json',
    default: {},
  })
  @AutoMap(() => Object)
  profile: Profile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
