import StoreType from '../../types/enums/store-type.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export default class CreateStoreRequest {
  @IsString()
  @IsNotEmpty({
    message: 'Адрес должен быть указан.',
  })
  address: string;

  @IsEnum(StoreType, {
    message: 'Тип должен строго соответствовать одному из списка.',
  })
  type: StoreType;
}
