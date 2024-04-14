import {
  Body,
  Controller,
  Delete,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import RegisterUserRequest from './dto/requests/register-user.request';
import AuthService from './auth.service';
import type { TokensResponse } from '../tokens/dto/responses/token.response';
import LoginUserRequest from './dto/requests/login-user.request';
import LogoutResponse from './dto/responses/logout.response';
import { TokenInterceptor } from '../tokens/interceptors/token.interceptor';

@Controller('auth')
@UseInterceptors(TokenInterceptor)
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterUserRequest): Promise<TokensResponse> {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginUserRequest): Promise<TokensResponse> {
    return this.authService.login(dto);
  }

  @Delete()
  logout(): LogoutResponse {
    return { refresh_token: 'invalidate' };
  }
}
