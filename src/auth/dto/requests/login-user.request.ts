import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class LoginUserRequest {
  @IsEmail(undefined, {
    message: 'Почта должна быть в формате mail@domain.zone.',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
