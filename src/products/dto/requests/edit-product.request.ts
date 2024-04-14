import {
  IsBase64,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export default class EditProductRequest {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsBase64()
  @IsNotEmpty()
  photo?: string;

  @IsOptional()
  @IsInt()
  @Min(100, {
    message: 'Стоимость не должна быть меньше 1 рубля.',
  })
  price?: number;

  @IsOptional()
  @IsInt()
  @Min(1, {
    message: 'Вес не должен быть меньше 1 грамма.',
  })
  weight?: number;

  @IsOptional()
  @IsInt()
  @Min(1, {
    message: 'Длина не должен быть меньше 1 сантиметра.',
  })
  length?: number;

  @IsOptional()
  @IsInt()
  @Min(1, {
    message: 'Высота не должен быть меньше 1 сантиметра.',
  })
  height?: number;

  @IsOptional()
  @IsInt()
  @Min(1, {
    message: 'Глубина не должен быть меньше 1 сантиметра.',
  })
  depth?: number;

  @IsOptional()
  @IsInt()
  @Min(1, {
    message: 'Идентификатор категории не должен быть меньше 1.',
  })
  category?: number;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  amount?: Record<number, number>;
}
