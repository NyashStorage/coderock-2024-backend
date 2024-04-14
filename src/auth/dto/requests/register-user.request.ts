import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export default class RegisterUserRequest {
  @IsEmail(undefined, {
    message: 'Почта должна быть в формате mail@domain.zone.',
  })
  email: string;

  @IsString()
  @Length(3, 64, {
    message: (args) =>
      `Пароль должен быть длиннее ${args.constraints[0]}, но короче ${args.constraints[1]} символов.`,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  companyName?: string;
}
