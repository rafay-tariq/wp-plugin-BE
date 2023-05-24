import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from '../v1/auth/auth.module';
import { UsersModule } from '../v1/users/users.module';
import { StoreModule } from '../v1/store/store.module';
import { StripeAccountModule } from '../v1/stripe-account/stripe-account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { LoggerMiddleware } from '../../middlewares/logger.middleware';
import { RolesGuard } from '../v1/auth/strategy/roles.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessTokenStrategy } from '../v1/auth/strategy/jwt-access-token-strategy.service';
import { JwtAuthGuard } from '../v1/auth/strategy/jwt-auth-guard';
import  { dataSourceOptions } from "../../db";
import { PackagesModule } from '../v1/packages/packages.module';
import { UserPackageModule } from '../v1/user-package/user-package.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule.register({
      timeout: 600000,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    PassportModule.register({ defaultStrategy: ['jwt'] }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    StripeAccountModule,
    StoreModule,
    PackagesModule,
    UserPackageModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    JwtAccessTokenStrategy,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
