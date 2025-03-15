import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './rest/user.controller';
import { UserResolver } from './graphql/user.resolver';

@Module({
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
