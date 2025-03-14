import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { AuthInput } from './dto/auth.input';
import { UserResponse } from './dto/user.response';
import { User } from 'src/user/entity/user.entity';

@Resolver(User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserResponse)
  async register(
    @Context() { req, res },
    @Args('options') options: AuthInput,
  ): Promise<UserResponse> {
    return this.authService.register(options.username, options.password, req);
  }

  @Mutation(() => UserResponse)
  async login(
    @Context() { req, res },
    @Args('options') options: AuthInput,
  ): Promise<UserResponse> {
    return this.authService.login(options.username, options.password, req);
  }

  @Mutation(() => String)
  public async logout(@Context() { req, res }) {
    return this.authService.logout(req, res);
  }
}
