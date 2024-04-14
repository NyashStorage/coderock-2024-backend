import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export default class EditUserRequest {
  @IsOptional()
  @IsString()
  @Length(3, 64, {
    message: (args) =>
      `Пароль должен быть длиннее ${args.constraints[0]}, но короче ${args.constraints[1]} символов.`,
  })
  password?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  companyName?: string;
}
