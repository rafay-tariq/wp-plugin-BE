import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
