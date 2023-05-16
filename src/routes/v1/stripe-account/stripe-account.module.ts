import { Module } from '@nestjs/common';
import { StripeAccountService } from './stripe-account.service';
import { StripeAccountController } from './stripe-account.controller';
import { StripeAccount } from './entities/stripe-account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StripeAccount])],
  controllers: [StripeAccountController],
  providers: [StripeAccountService],
  exports: [ StripeAccountService]
})
export class StripeAccountModule {}
