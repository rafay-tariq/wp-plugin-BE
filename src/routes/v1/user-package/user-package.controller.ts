import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserPackageService } from './user-package.service';
import { CreateUserPackageDto } from './dto/create-user-package.dto';
import { UpdateUserPackageDto } from './dto/update-user-package.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/custom.decorator';
import { UserRole } from '../users/enums/role.enum';

@Controller('user-package')
@ApiTags('User Packages')
@ApiBearerAuth('Authorization')

export class UserPackageController {
  constructor(private readonly userPackageService: UserPackageService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createUserPackageDto: CreateUserPackageDto) {
    return this.userPackageService.create(createUserPackageDto);
  }

  @Get()
  findAll() {
    return this.userPackageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPackageService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateUserPackageDto: UpdateUserPackageDto) {
    return this.userPackageService.update(+id, updateUserPackageDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.userPackageService.remove(+id);
  }
}
