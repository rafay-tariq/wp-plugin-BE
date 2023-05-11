import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard(['jwt', 'jwt-refresh']) {
  constructor(private readonly reflector: Reflector) {
    super({
      passReqToCallback: true,
    });
  }

  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const noAuth = this.reflector.get<boolean>('no-auth', context.getHandler());

    if (noAuth) return true;
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    // If authentication fails, we throw an UnauthorizedException so that
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
