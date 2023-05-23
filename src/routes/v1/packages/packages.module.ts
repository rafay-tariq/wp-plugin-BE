import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Package])],
  providers: [PackagesService],
  controllers: [PackagesController]
})
export class PackagesModule {}
