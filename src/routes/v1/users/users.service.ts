import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  findById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }
  findOne(email: string): Promise<User> {
    return this.userRepository.findOne({
      where:{
        email,
      }
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      Object.keys(data).forEach((key) => {
        Logger.debug(data[`${key}`]);
        user[`${key}`] = data[`${key}`];
      });
      Logger.debug(JSON.stringify(user));
      return await this.userRepository.save(user);
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
