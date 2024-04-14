import RouteType from '../../types/enums/route-type.enum';
import { IsEnum, IsInt, Min } from 'class-validator';

export default class CreateRouteRequest {
  @IsInt()
  @Min(1, {
    message: 'Дистанция не должен быть меньше 1 километра.',
  })
  distance: number;

  @IsInt()
  @Min(1, {
    message: 'Время преодоления не должно быть меньше 1 часа.',
  })
  time: number;

  @IsInt()
  @Min(100, {
    message: 'Стоимость доставки не должна быть меньше 1 рубля.',
  })
  price: number;

  @IsEnum(RouteType, {
    message: 'Тип должен строго соответствовать одному из списка.',
  })
  type: RouteType;

  @IsInt()
  @Min(1, {
    message: 'Идентификатор склада не должен быть меньше 1.',
  })
  from: number;

  @IsInt()
  @Min(1, {
    message: 'Идентификатор склада не должен быть меньше 1.',
  })
  to: number;
}
