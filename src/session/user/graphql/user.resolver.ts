import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Authentication } from 'src/session/auth/graphql/decorators/auth.decorator';
import { CurrentUser } from './decorators/user.decorator';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true })
  @Authentication()
  async findProfileBySession(@CurrentUser('id') userId: string) {
    return this.userService.findById(+userId);
  }

  @Query(() => User, { nullable: true })
  async findByIdBySession(@Args('id') id: string) {
    return this.userService.findById(+id);
  }
}
