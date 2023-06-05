
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';
import { Repository } from 'typeorm';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { PurchasePackageDto } from './dto/purchase-package.dto';
import { UserPackageService } from '../user-package/user-package.service';
import * as moment from "moment";

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package) private readonly packageRepository: Repository<Package>,
    private readonly userPackageService: UserPackageService,
    @InjectStripe() private readonly stripeClient: Stripe,


  ) {}
  async create(createPackageDto: CreatePackageDto): Promise<Package>  {
    try {
        return await this.packageRepository.save({...createPackageDto});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async purchasePackage(purchasePackageDto: PurchasePackageDto, userId: number) {
    try {
      const currentDate = moment();
      const expirationDate = moment(currentDate).add(30, 'days').startOf('day');  
      console.log("---expirationDate",expirationDate);
      console.log("---expirationDate",expirationDate.toISOString());
      console.log("---expirationDate",expirationDate.toString());


      const packageDetail = await this.findOne(purchasePackageDto.packageId);
      if(!packageDetail){
        throw new HttpException(Error("Invalid package!"), HttpStatus.BAD_REQUEST);
      }
      const purchaseAccount = await this.stripeClient.charges.create({
        amount: packageDetail.price * 100, // to convert dollar to cents
        currency: 'usd',
        source: purchasePackageDto.token,
        description: "Purchase package"
      });
     
      await this.userPackageService.create({
        autoRenew: false,
        userId: userId,
        packageId: packageDetail.id,
        expirationDate: new Date(expirationDate.toISOString()),
        stripeChargeId: purchaseAccount.id,
      })

    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.packageRepository.find({});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      return await this.packageRepository.findOne({where: { id }});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async findWhere(where: Object) {
    try {
      return await this.packageRepository.findOne({where});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updatePackageDto: UpdatePackageDto) {
    try {
      const res = await this.packageRepository.update(id, {...updatePackageDto});
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
      const res = await this.packageRepository.delete(id);
      if(res.affected){
        return {msg: "Deleted successfully."};
      }else {
        return {msg: "Failed to delete the data."};
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}

