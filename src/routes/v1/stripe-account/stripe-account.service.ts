import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreService } from '../store/store.service';
import { CreateStripeAccountDto } from './dto/create-stripe-account.dto';
import { UpdateStripeAccountDto } from './dto/update-stripe-account.dto';
import { StripeAccount } from './entities/stripe-account.entity';

@Injectable()
export class StripeAccountService {
  constructor(
    @InjectRepository(StripeAccount) private readonly stripeAccountRepository: Repository<StripeAccount>,
    @Inject(forwardRef(() => StoreService))
    private readonly storeService: StoreService, 
  ) {}

  async create(createStripeAccountDto: CreateStripeAccountDto) {
    return await this.stripeAccountRepository.save(createStripeAccountDto);
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
      return await this.stripeAccountRepository.findOne({where: { id }});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateStoreDto: UpdateStripeAccountDto): Promise<boolean> {
    try {
      const res = await this.stripeAccountRepository.update(id, updateStoreDto);
      if(res.affected){
        return true;
      }else {
        return false;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const store = this.storeService.findWhere({stripeAccountId: id});
      if(store){
        throw new HttpException(Error('Stripe account is already linked with some store'), HttpStatus.BAD_REQUEST);
      }
      const res = await this.stripeAccountRepository.delete(id);
      if(res.affected){
        return true;
      }else {
        return false;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
