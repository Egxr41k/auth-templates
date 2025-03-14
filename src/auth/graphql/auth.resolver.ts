import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { AuthInput } from './dto/auth.input';
import { UserResponse } from './dto/user.response';
import { Req } from '@nestjs/common';
import { ExpressReq } from './decorators/express-req.decorator';
import { Request } from 'express';
import { User } from 'src/user/entity/user.entity';

@Resolver(User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserResponse)
  async register(
    @Context() { req, res }: { req: any; res: any },
    @Args('options') options: AuthInput,
  ): Promise<UserResponse> {
    return this.authService.register(options.username, options.password, req);
  }

  @Mutation(() => UserResponse)
  async login(
    @Context() { request, res },
    @Req() req,
    @ExpressReq() expressReq: Request,
    @Args('options') options: AuthInput,
  ): Promise<UserResponse> {
    console.log(request, req, expressReq);
    return this.authService.login(options.username, options.password, req);
  }

  @Mutation(() => Boolean)
  public async logout(@Context() { req, res }: { req: any; res: any }) {
    return this.authService.logout(req, res);
  }
}
