import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthDto } from './auth.dto';
import { UserResponse } from 'src/user/user.response';
import { RefreshTokenDto } from './refresh-token.dto';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async register(@Body() dto: AuthDto): Promise<UserResponse> {
    return this.authService.register(dto.email, dto.password);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() dto: AuthDto): Promise<UserResponse> {
    return this.authService.login(dto.email, dto.password);
  }

  @HttpCode(200)
  @Post('access-token')
  async accessToken(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto.refreshToken);
  }
}
