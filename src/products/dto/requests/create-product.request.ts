import {
  IsBase64,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  Min,
} from 'class-validator';

export default class CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBase64()
  @IsNotEmpty()
  photo: string;

  @IsInt()
  @Min(100, {
    message: 'Стоимость не должна быть меньше 1 рубля.',
  })
  price: number;

  @IsInt()
  @Min(1, {
    message: 'Вес не должен быть меньше 1 грамма.',
  })
  weight: number;

  @IsInt()
  @Min(1, {
    message: 'Длина не должен быть меньше 1 сантиметра.',
  })
  length: number;

  @IsInt()
  @Min(1, {
    message: 'Высота не должен быть меньше 1 сантиметра.',
  })
  height: number;

  @IsInt()
  @Min(1, {
    message: 'Глубина не должен быть меньше 1 сантиметра.',
  })
  depth: number;

  @IsInt()
  @Min(1, {
    message: 'Идентификатор категории не должен быть меньше 1.',
  })
  category: number;

  @IsObject()
  @IsNotEmptyObject()
  amount: Record<number, number>;
}
