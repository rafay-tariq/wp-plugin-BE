import { Injectable } from '@nestjs/common';
import { CreateStripeAccountDto } from './dto/create-stripe-account.dto';
import { UpdateStripeAccountDto } from './dto/update-stripe-account.dto';

@Injectable()
export class StripeAccountService {
  create(createStripeAccountDto: CreateStripeAccountDto) {
    return 'This action adds a new stripeAccount';
  }

  findAll() {
    return `This action returns all stripeAccount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripeAccount`;
  }

  update(id: number, updateStripeAccountDto: UpdateStripeAccountDto) {
    return `This action updates a #${id} stripeAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} stripeAccount`;
  }
}
