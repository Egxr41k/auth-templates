import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { LoginGuard } from './Guards/login.gql.guard';
import { SessionAccount } from './Decorators/session-account.gql.decorator';
import { Session } from './Decorators/session.gql.decorator';
import { AuthenticatedGuard } from './Guards/authenticated.gql.guard';

@Resolver('User')
export class AuthResolver {
  constructor(
    @Inject('UsersService') private readonly _usersService: UsersService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Query()
  async user(@Args('username') username: string) {
    return this._usersService.findOne(username);
  }

  @UseGuards(LoginGuard('local'))
  @Mutation()
  async login(
    @SessionAccount() user,
    @Args('username') _username: string,
    @Args('password') _password: string,
  ) {
    return user;
  }

  @UseGuards(AuthenticatedGuard)
  @Query()
  async views(@Session() session) {
    session.views = (session.views || 0) + 1;
    return session.views;
  }

  @UseGuards(AuthenticatedGuard)
  @Query()
  async me(@SessionAccount() user) {
    return user;
  }
}
