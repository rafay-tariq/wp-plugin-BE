import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';

// @Module({
//   controllers: [StoreController],
//   providers: [StoreService]
// })
// export class StoreModule {}

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
