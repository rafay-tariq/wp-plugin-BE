import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NoAuth } from './strategy/no-auth.guard';
import { UpdateUserDto } from '../users/dto/update-user.dto';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @NoAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Res() res, @Body() body: LoginUserDto) {
    const auth = await this.authService.login(body);
    res.status(auth.status).json(auth.content);
  }

  @HttpCode(HttpStatus.OK)
  @NoAuth()
  @Post('register')
  async register(@Res() res, @Body() body: CreateUserDto) {
    const auth = await this.authService.register(body);
    res.status(auth.status).json(auth.content);
  }

  @Post('update')
  @ApiBearerAuth('Authorization')
  async update(@Req() req ,@Body() updateUserDto: UpdateUserDto){
    return await this.authService.update(req.user.id, updateUserDto);
  }
}
