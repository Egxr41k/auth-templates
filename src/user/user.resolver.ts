import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from 'src/auth/graphql/guards/authenticated.gql.guard';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true })
  @UseGuards(AuthenticatedGuard)
  async findProfile(@Context() { req }: { req: any }) {
    const id = req.user.id;
    return this.userService.findById(id);
  }

  @Query(() => User, { nullable: true })
  async findById(@Args('id') id: number) {
    return this.userService.findById(id);
  }
}
