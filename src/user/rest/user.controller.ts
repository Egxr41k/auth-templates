import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UserService } from '../user.service';
import { CurrentUser } from 'src/user/rest/decorators/user.decorator';
import { Authentication } from 'src/auth/rest/decorators/auth.decorator';

@Controller('user')
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
