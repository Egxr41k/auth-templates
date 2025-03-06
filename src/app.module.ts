import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SessionModule } from 'nestjs-session';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportSessionModule } from './auth/passport-session.module';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from './mikro-orm/mikro-orm.config';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

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
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    MikroOrmModule.forRoot(config),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
