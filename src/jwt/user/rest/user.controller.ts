import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CurrentUser } from 'src/session/user/rest/decorators/user.decorator';
import { Authentication } from 'src/jwt/auth/auth.decorator';
import { UserService } from 'src/user/user.service';

@Controller('jwt/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authentication()
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  public async findProfile(@CurrentUser('id') userId: string) {
    return this.userService.findById(+userId);
  }

  @Authentication()
  @HttpCode(HttpStatus.OK)
  @Get('by-id/:id')
  public async findById(@Param('id') id: string) {
    return this.userService.findById(+id);
  }
}
