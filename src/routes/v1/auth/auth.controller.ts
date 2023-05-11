import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NoAuth } from './strategy/no-auth.guard';
import { AuthGuard } from '@nestjs/passport';
@ApiBearerAuth()
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
  async register(@Req() req, @Res() res, @Body() body: CreateUserDto) {
    const auth = await this.authService.register(body);
    res.status(auth.status).json(auth.content);
  }
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() req, @Res() res) {
    const id: number = req.user.id;
    
    res.status(200).json({success: true});
  }
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshToken(@Req() req, @Res() res) {
    const user: any = req.user;
    res.status(200).json({success: true});
  }
}
