import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JWTAuthDto } from './dto/j-w-t-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  getJWT(@Body() createAuthDto: JWTAuthDto) {
    return this.authService.getJWT(createAuthDto);
  }

}
