import { Module } from '@nestjs/common';
import { StripeAccountService } from './stripe-account.service';
import { StripeAccountController } from './stripe-account.controller';

@Module({
  controllers: [StripeAccountController],
  providers: [StripeAccountService]
})
export class StripeAccountModule {}
