import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/entity/user.entity';
import { Authentication } from '../../auth/auth.decorator';
import { CurrentUser } from './decorators/user.decorator';
import { UserService } from 'src/user/user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true })
  @Authentication()
  async findProfileByJwt(@CurrentUser('id') userId: string) {
    return this.userService.findById(+userId);
  }

  @Query(() => User, { nullable: true })
  async findByIdByJwt(@Args('id') id: string) {
    return this.userService.findById(+id);
  }
}
