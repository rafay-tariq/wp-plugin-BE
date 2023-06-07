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

  async findAll(where: Object) {
    try {
      return await this.storeRepository.find({where , relations: ['stripeAccount']});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(where: object) {
    try {
      return await this.storeRepository.findOne({where, relations: ['stripeAccount']});
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

  async update(where: object, updateStoreDto: UpdateStoreDto) {
    try {
      const res = await this.storeRepository.update(where, {...updateStoreDto});
      if(res.affected){
        return {msg: "Updated successfully."};
      }else {
        throw new HttpException(Error("Failed to update the account"), HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(where: object) {
    try {
      const res = await this.storeRepository.delete(where);
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
