import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './rest/auth.controller';
import { AuthResolver } from './graphql/auth.resolver';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from './jwt.config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
