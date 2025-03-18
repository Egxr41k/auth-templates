import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { AuthInput } from 'src/user/auth.input';
import { UserResponse } from 'src/user/user.response';
import { RefreshTokenInput } from './refresh-token.input';

@Resolver(UserResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserResponse)
  async registerByJwt(
    @Args('options') options: AuthInput,
  ): Promise<UserResponse> {
    return this.authService.register(options.email, options.password);
  }

  @Mutation(() => UserResponse)
  async loginByJwt(@Args('options') options: AuthInput): Promise<UserResponse> {
    return this.authService.login(options.email, options.password);
  }

  @Mutation(() => UserResponse)
  async accessTokenByJwt(
    @Args('options') options: RefreshTokenInput,
  ): Promise<UserResponse> {
    return this.authService.getNewTokens(options.refreshToken);
  }
}
