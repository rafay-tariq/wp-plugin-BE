import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StripeAccountService } from '../stripe-account/stripe-account.service';
import { StripeAccount } from '../stripe-account/entities/stripe-account.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Store, StripeAccount]), HttpModule],
  providers: [StoreService, StripeAccountService],
  exports: [StoreService],
  controllers: [StoreController]
})
export class StoreModule {}
