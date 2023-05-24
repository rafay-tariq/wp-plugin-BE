import { Module } from '@nestjs/common';
import { UserPackageService } from './user-package.service';
import { UserPackageController } from './user-package.controller';
import { UserPackage } from './entities/user-package.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserPackage])],
  providers: [UserPackageService],
  controllers: [UserPackageController]
})
export class UserPackageModule {}
