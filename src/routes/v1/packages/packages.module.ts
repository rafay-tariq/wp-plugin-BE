import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { UserPackageService } from '../user-package/user-package.service';
import { UserPackage } from '../user-package/entities/user-package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Package, UserPackage])],
  providers: [PackagesService, UserPackageService],
  controllers: [PackagesController]
})
export class PackagesModule {}
