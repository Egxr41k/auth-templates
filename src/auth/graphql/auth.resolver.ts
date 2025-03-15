import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { AuthInput } from './auth.input';
import { User } from 'src/user/entity/user.entity';

@Resolver(User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async register(
    @Context() { req, res },
    @Args('options') options: AuthInput,
  ): Promise<User> {
    return this.authService.register(options.email, options.password, req);
  }

  @Mutation(() => User)
  async login(
    @Context() { req, res },
    @Args('options') options: AuthInput,
  ): Promise<User> {
    return this.authService.login(options.email, options.password, req);
  }

  @Mutation(() => String)
  public async logout(@Context() { req, res }) {
    return this.authService.logout(req, res);
  }
}
