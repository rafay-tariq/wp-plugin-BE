import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { validate } from 'class-validator';
import { LoggerService } from '../../../logger/logger.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { TokensDto } from './dto/tokens.dto';
import { ExceptionMessageConstant } from "../../../../constant/exception-message.constant";

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: LoggerService = new Logger(AuthService.name),
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(user: LoginUserDto): Promise<Record<string, any>> {
    // Transform body into DTO
    const userDTO = new CreateUserDto();
    userDTO.email = user.email;
    userDTO.password = user.password;
    const userDetails = await this.usersService.findOne(user.email);

    // Check if user exists
    if (userDetails == null) {
      return { status: 401, content: { msg: ExceptionMessageConstant.INVALID_CREDENTIAL } };
    }
  
    // Check if the given password match with saved password
    const isValid = bcryptjs.compareSync(user.password, userDetails.password);
    if (isValid) {
      // Generate JWT token
      const tokens = await this.getTokens(userDetails.id);
      return {
        status: 200,
        content: {
          user: userDetails,
          access_token: tokens.accessToken
        },
      };
    } else {
      // Password or email does not match
      return { status: 401, content: { msg: ExceptionMessageConstant.INVALID_CREDENTIAL } };
    }
  }

  async register(body: CreateUserDto): Promise<Record<string, any>> {
    // Validation Flag
    let isOk = false;

    // Transform body into DTO
    const userDTO = new CreateUserDto();
    userDTO.email = body.email;
    userDTO.firstName = body.firstName;
    userDTO.lastName = body.lastName;
    userDTO.password = bcryptjs.hashSync(body.password, 10);

    // Validate DTO against validate function from class-validator
    await validate(userDTO).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`${errors}`);
      } else {
        isOk = true;
      }
    });
    if (isOk) {
      await this.usersService.create(userDTO).catch((error) => {
        this.logger.debug(error.message);
        isOk = false;
      });
      if (isOk) {
        return { status: 201, content: { msg: 'User created with success' } };
      } else {
        return { status: 400, content: { msg: 'User already exists' } };
      }
    } else {
      return { status: 400, content: { msg: 'Invalid content' } };
    }
  }


  async getTokens(userId: number): Promise<TokensDto> {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId
        },
        {
          privateKey: process.env.PRIVATE_KEY,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRE_DURATION,
        },
      )
    ]);

    return {
      accessToken
    };
  }
  async update(id: number, updateUserDto: UpdateUserDto){
    if(updateUserDto.password){
      updateUserDto.password = bcryptjs.hashSync(updateUserDto.password, 10);
    }
    return await this.usersService.update(id, updateUserDto);

  }
}
