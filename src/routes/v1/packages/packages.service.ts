
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package) private readonly packageRepository: Repository<Package>,

  ) {}
  async create(createPackageDto: CreatePackageDto): Promise<Package>  {
    try {
        return await this.packageRepository.save({...createPackageDto});
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

