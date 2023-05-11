import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { ExceptionMessageConstant } from "../../../../../constant/exception-message.constant";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.JWT_REFRESH_PRIVATE.replace(/\\\\n/gm, '\\n')}`,
      passReqToCallback: true,
      algorithms: ['RS512'],
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    // Accept the JWT and attempt to validate it using the user service
    const user = await this.userService.findOne(payload.email);
    // If the user is not found, throw an error
    if (!user) {
      throw new HttpException(ExceptionMessageConstant.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
    }
    // If the user is found, return the user
    return { ...user, refreshToken };
  }
}
