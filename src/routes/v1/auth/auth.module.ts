import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { LoggerModule } from '../../../logger/logger.module';
import { JwtAccessTokenStrategy } from './strategy/jwt-access-token-strategy.service';
@Module({
  imports: [LoggerModule, JwtModule.register({
    secret: process.env.PRIVATE_KEY,
  }), UsersModule, TypeOrmModule.forFeature([User])],
  providers: [AuthService, JwtAccessTokenStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
