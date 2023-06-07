import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/custom.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './enums/role.enum';
import { UsersService } from './users.service';

@Controller('user')
@ApiTags('Users')
@ApiBearerAuth('Authorization')
@Roles(UserRole.ADMIN)

export class UserController {
  constructor(private readonly userService: UsersService) {}

  
  @Get()
  findAll() {
    return this.userService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPackageDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserPackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
