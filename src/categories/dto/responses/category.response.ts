import { AutoMap } from 'automapper-classes';

export default class CategoryResponse {
  @AutoMap()
  id: number;

  @AutoMap()
  title: string;
}
