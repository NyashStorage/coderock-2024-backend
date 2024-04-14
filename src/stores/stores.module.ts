import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import StoresController from './stores.controller';
import StoresService from './stores.service';
import StoreEntity from './entities/store.entity';
import StoresRepository from './repositories/stores.repository';
import StoreProfile from './profiles/store.profile';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity])],
  controllers: [StoresController],
  providers: [StoresService, StoresRepository, StoreProfile],
  exports: [StoresService, StoresRepository, StoreProfile],
})
export default class StoresModule {}
