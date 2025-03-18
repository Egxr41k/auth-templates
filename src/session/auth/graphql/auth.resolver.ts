import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { AuthInput } from 'src/user/auth.input';
import { UserResponse } from 'src/user/user.response';

@Resolver(UserResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserResponse)
  async registerBySession(
    @Context() { req, res },
    @Args('options') options: AuthInput,
  ): Promise<UserResponse> {
    return this.authService.register(options.email, options.password, req);
  }

  @Mutation(() => UserResponse)
  async loginBySession(
    @Context() { req, res },
    @Args('options') options: AuthInput,
  ): Promise<UserResponse> {
    return this.authService.login(options.email, options.password, req);
  }

  @Mutation(() => String)
  public async logoutBySession(@Context() { req, res }) {
    return this.authService.logout(req, res);
  }
}
