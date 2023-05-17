import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { StripeAccountService } from './stripe-account.service';
import { CreateStripeAccountDto } from './dto/create-stripe-account.dto';
import { UpdateStripeAccountDto } from './dto/update-stripe-account.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('stripe-account')
@ApiTags('Stripe Account')
@ApiBearerAuth('Authorization')
export class StripeAccountController {
  constructor(private readonly stripeAccountService: StripeAccountService) {}

  @Post()
  create(@Body() createStripeAccountDto: CreateStripeAccountDto) {
    return this.stripeAccountService.create(createStripeAccountDto);
  }

  @Get()
  findAll() {
    return this.stripeAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stripeAccountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStripeAccountDto: UpdateStripeAccountDto) {
    return this.stripeAccountService.update(+id, updateStripeAccountDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.stripeAccountService.remove(+id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}

