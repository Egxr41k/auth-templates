import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request, Response } from 'express';
import { AuthDto } from './auth.dto';
import { UserResponse } from 'src/user/user.response';

@Controller('session/auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async register(
    @Req() req: Request,
    @Body() dto: AuthDto,
  ): Promise<UserResponse> {
    return this.authService.register(dto.email, dto.password, req);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Req() req: Request,
    @Body() dto: AuthDto,
  ): Promise<UserResponse> {
    return this.authService.login(dto.email, dto.password, req);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(req, res);
  }
}
