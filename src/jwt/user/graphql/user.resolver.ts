import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/entity/user.entity';
import { CurrentUser } from './decorators/user.decorator';
import { UserService } from 'src/user/user.service';
import { Authentication } from 'src/jwt/auth/graphql/decorators/auth.decorator';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true })
  @Authentication()
  async findProfileByJwt(@CurrentUser() user: User) {
    return this.userService.findById(+user.id);
  }

  @Query(() => User, { nullable: true })
  async findByIdByJwt(@Args('id') id: string) {
    return this.userService.findById(+id);
  }
}
