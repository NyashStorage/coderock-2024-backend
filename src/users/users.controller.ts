import { Body, Controller, Get, Put, UseInterceptors } from '@nestjs/common';
import User from './decorators/user.decorator';
import UserEntity from './entities/user.entity';
import { MapInterceptor } from 'automapper-nestjs';
import RequireAuthorization from '../auth/decorators/require-authorization.decorator';
import UsersService from './users.service';
import EditUserRequest from './dto/requests/edit-user.request';
import UserResponse from './dto/responses/user.response';

@RequireAuthorization()
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseInterceptors(MapInterceptor(UserEntity, UserResponse))
  me(@User() user: UserEntity): UserEntity {
    return user;
  }

  @Put()
  @UseInterceptors(MapInterceptor(UserEntity, UserResponse))
  edit(
    @User() user: UserEntity,
    @Body() dto: EditUserRequest,
  ): Promise<UserEntity> {
    return this.usersService.edit(user, dto);
  }
}
