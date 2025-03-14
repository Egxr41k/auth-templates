import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Authorization } from 'src/auth/rest/decorators/auth.decorator';
import { Authorized } from 'src/auth/rest/decorators/authorized';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  // @Get('me')
  public async findProfile(@Authorized('id') userId: string) {
    return this.userService.findById(+userId);
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get('by-id/:id')
  public async findById(@Param('id') id: string) {
    return this.userService.findById(+id);
  }
}
