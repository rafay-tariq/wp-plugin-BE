import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
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
  async create(createStoreDto: CreateStoreDto): Promise<Store>  {
    try {
        const strip = await this.stripeAccountService.findOne(createStoreDto.stripeAccountId);
        if(strip){
          return await this.storeRepository.save({...createStoreDto, stripeAccount: strip});
        }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.storeRepository.find({});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      return await this.storeRepository.findOne({where: { id }});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<boolean> {
    try {
      const res = await this.storeRepository.update(id, updateStoreDto);
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
      const res = await this.storeRepository.delete(id);
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
