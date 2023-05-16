import { Module } from '@nestjs/common';
import { StripeAccountService } from './stripe-account.service';
import { StripeAccountController } from './stripe-account.controller';
import { StripeAccount } from './entities/stripe-account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreService } from '../store/store.service';
import { Store } from '../store/entities/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StripeAccount, Store])],
  controllers: [StripeAccountController],
  providers: [StripeAccountService, StoreService],
  exports: [ StripeAccountService]
})
export class StripeAccountModule {}
