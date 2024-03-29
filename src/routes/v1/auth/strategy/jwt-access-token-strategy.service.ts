import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { ExceptionMessageConstant } from "../../../../../constant/exception-message.constant";

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService, private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  /**
   * @description Validate the token and return the user
   * @param payload string
   * @returns User
   */
  async validate(payload: any): Promise<User> {
    console.log("---payload",payload);
    // Accept the JWT and attempt to validate it using the user service
    const user = await this.usersService.findById(payload.id);
    // If the user is not found, throw an error
    if (!user) {
      throw new HttpException(ExceptionMessageConstant.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    // If the user is found, return the user
    return user;
  }
}
