import { HttpService } from '@nestjs/axios';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom, map } from 'rxjs';
import { Repository } from 'typeorm';
import { StoreService } from '../store/store.service';
import { CreateStripeAccountDto } from './dto/create-stripe-account.dto';
import { GetTransactionDto } from './dto/get-transactions.dto';
import { UpdateStripeAccountDto } from './dto/update-stripe-account.dto';
import { StripeAccount } from './entities/stripe-account.entity';

@Injectable()
export class StripeAccountService {
  constructor(
    @InjectRepository(StripeAccount) private readonly stripeAccountRepository: Repository<StripeAccount>,
    @Inject(forwardRef(() => StoreService))
    private readonly storeService: StoreService,
    private httpService: HttpService
  ) { }

  async getStripeTransactions(getTransactionsDto: GetTransactionDto) {
    try {
      const stripeAccount = await this.findOne(getTransactionsDto.stripeAccount);
      if(!stripeAccount){
        throw new HttpException('Invalid stripe account', HttpStatus.BAD_REQUEST);
      }
      const url = `https://api.stripe.com/v1/issuing/transactions?limit=${getTransactionsDto.limit}`;
      const headersRequest = {
        'Authorization': 'Basic ' + Buffer.from(`${stripeAccount.secretKey}:`).toString('base64')
      };

      const getStripeData =  await firstValueFrom(this.httpService.get(url, { headers: headersRequest }).pipe(map((res) => {
        return res.data;
      })));
      console.log('---getStripeData',getStripeData);
      return {getStripeData};
    } catch (error) {
      console.log("--error",error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(createStripeAccountDto: CreateStripeAccountDto, userId: number) {
    return await this.stripeAccountRepository.save({...createStripeAccountDto, userId});
  }
  async findAll() {
    try {
      return await this.stripeAccountRepository.find();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      return await this.stripeAccountRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateStoreDto: UpdateStripeAccountDto): Promise<boolean> {
    try {
      const res = await this.stripeAccountRepository.update(id, updateStoreDto);
      if (res.affected) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const store = await this.storeService.findWhere({ stripeAccountId: id });
      if (store) {
        throw new HttpException('Stripe account is already linked with some store', HttpStatus.BAD_REQUEST);
      }
      const res = await this.stripeAccountRepository.delete(id);
      if (res.affected) {
        return { msg: "Account deleted successfully." };
      } else {
        return { msg: "Failed to delete account!" };
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
