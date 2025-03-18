import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './rest/auth.controller';
import { AuthResolver } from './graphql/auth.resolver';
import { UserModule } from '../user/user.module';
import { SessionService } from './session.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, AuthResolver, SessionService],
})
export class AuthModule {}
