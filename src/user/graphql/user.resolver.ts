import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { User } from '../entity/user.entity';
import { UserService } from '../user.service';
import { Authentication } from 'src/auth/graphql/decorators/auth.decorator';
import { CurrentUser } from './decorators/user.decorator';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true })
  @Authentication()
  async findProfile(@CurrentUser('id') userId: string) {
    return this.userService.findById(+userId);
  }

  @Query(() => User, { nullable: true })
  async findById(@Args('id') id: string) {
    return this.userService.findById(+id);
  }
}
