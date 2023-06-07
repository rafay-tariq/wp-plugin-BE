import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserPackageService } from '../user-package/user-package.service';
import { UserPackage } from '../user-package/entities/user-package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPackage])],
  providers: [UsersService, UserPackageService],
  controllers: [UserController],
  exports: [UsersService]
})
export class UsersModule {}
