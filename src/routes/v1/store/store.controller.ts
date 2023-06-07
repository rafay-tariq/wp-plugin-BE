import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '../users/enums/role.enum';

@Controller('store')
@ApiTags('Store')
@ApiBearerAuth('Authorization')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@Req() req, @Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto, req.user.id);
  }

  @Get()
  findAll(@Req() req) {
    let where = { userId: req.user.id  };

    if(req.user.role == UserRole.ADMIN){
      delete where.userId;
    }
    return this.storeService.findAll(where);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    let where = { id , userId: req.user.id};

    if(req.user.role == UserRole.ADMIN){
      delete where.userId;
    }
    return this.storeService.findOne(where);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    let where = { id , userId: req.user.id};

    if(req.user.role == UserRole.ADMIN){
      delete where.userId;
    }
    return this.storeService.update(where, updateStoreDto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
     let where = { id , userId: req.user.id};

    if(req.user.role == UserRole.ADMIN){
      delete where.userId;
    }
    return this.storeService.remove(where);
  }
}
