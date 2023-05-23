import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StripeAccount } from '../stripe-account/entities/stripe-account.entity';
import { StripeAccountService } from '../stripe-account/stripe-account.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store) private readonly storeRepository: Repository<Store>,
    @Inject(forwardRef(() => StripeAccountService))
    private readonly stripeAccountService: StripeAccountService,
  ) {}
  async create(createStoreDto: CreateStoreDto, userId: number): Promise<Store>  {
    try {
        return await this.storeRepository.save({...createStoreDto, userId});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.storeRepository.find({relations: ['stripeAccount']});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      return await this.storeRepository.findOne({where: { id }, relations: ['stripeAccount']});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async findWhere(where: Object) {
    try {
      return await this.storeRepository.findOne({where});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    try {
      const stripe = new StripeAccount();
      stripe.id = id;
      const res = await this.storeRepository.update(id, {...updateStoreDto});
      if(res.affected){
        return {msg: "Updated successfully."};
      }else {
        throw new HttpException(Error("Failed to update the account"), HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.storeRepository.delete(id);
      if(res.affected){
        return {msg: "Updated successfully."};
      }else {
        return false;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
