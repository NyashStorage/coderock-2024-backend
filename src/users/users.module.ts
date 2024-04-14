import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './entities/user.entity';
import UsersRepository from './repositories/users.repository';
import UsersController from './users.controller';
import UserProfile from './profiles/user.profile';
import TokensModule from '../tokens/tokens.module';
import UsersService from './users.service';

@Global()
@Module({
  imports: [TokensModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UserProfile],
  exports: [UsersService, UsersRepository, UserProfile],
})
export default class UsersModule {}
