import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '../../../routes/v1/users/enums/role.enum';
import { Roles } from 'src/decorators/custom.decorator';
import { PurchasePackageDto } from './dto/purchase-package.dto';

@Controller('packages')
@ApiTags('Packages')
@ApiBearerAuth('Authorization')
@Roles(UserRole.ADMIN)
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packagesService.create(createPackageDto);
  }

  @Post('/purchase')
  purchasePackage(@Body() purchasePackageDto: PurchasePackageDto, @Req() req) {
    return this.packagesService.purchasePackage(purchasePackageDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.packagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
    return this.packagesService.update(+id, updatePackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packagesService.remove(+id);
  }
}
