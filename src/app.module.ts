import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SessionModule } from 'nestjs-session';
import { AuthModule as JwtAuthModule } from './jwt/auth/auth.module';
import { AuthModule as SessionAuthModule } from './session/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from './mikro-orm/mikro-orm.config';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // SessionModule.forRoot({
    //   session: {
    //     secret: 'keyboard cat',
    //     // resave: false,
    //     // saveUninitialized: false,
    //   },
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    MikroOrmModule.forRoot(config),
    SessionAuthModule,
    JwtAuthModule,
  ],
})
export class AppModule {}
