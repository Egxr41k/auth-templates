import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CurrentUser } from 'src/session/user/rest/decorators/user.decorator';
import { Authentication } from 'src/session/auth/rest/decorators/auth.decorator';

@Controller('session/user')
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
