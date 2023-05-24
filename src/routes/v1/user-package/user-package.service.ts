import { CreateUserPackageDto } from './dto/create-user-package.dto';
import { UpdateUserPackageDto } from './dto/update-user-package.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPackage } from './entities/user-package.entity';

@Injectable()
export class UserPackageService {
  constructor(
    @InjectRepository(UserPackage) private readonly userPackageRepository: Repository<UserPackage>,

  ) {}
  async create(createUserPackageDto: CreateUserPackageDto)  {
    try {
        return await this.userPackageRepository.save({...createUserPackageDto});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.userPackageRepository.find({});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      return await this.userPackageRepository.findOne({where: { id }});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async findWhere(where: Object) {
    try {
      return await this.userPackageRepository.findOne({where});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updatePackageDto: UpdateUserPackageDto) {
    try {
      const res = await this.userPackageRepository.update(id, {...updatePackageDto});
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
      const res = await this.userPackageRepository.delete(id);
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

