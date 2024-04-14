import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoryEntity from './entities/category.entity';
import CategoriesController from './categories.controller';
import CategoriesService from './categories.service';
import CategoriesRepository from './repositories/categories.repository';
import CategoryProfile from './profiles/category.profile';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository, CategoryProfile],
  exports: [CategoriesService, CategoriesRepository, CategoryProfile],
})
export default class CategoriesModule {}
