import { IsInt, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export default class OffsetableQuery {
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset = 0;

  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit = 20;
}
