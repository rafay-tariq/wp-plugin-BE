import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { LoggerModule } from '../../../logger/logger.module';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token-strategy.service';
@Module({
  imports: [LoggerModule, JwtModule.register({}), UsersModule, TypeOrmModule.forFeature([User])],
  providers: [AuthService, JwtRefreshTokenStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
