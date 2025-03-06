import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
import IORedis from 'ioredis';
import { RedisStore } from 'connect-redis';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const redisHost = configService.getOrThrow<string>('REDIS_HOST');
  const redisPort = configService.getOrThrow<number>('REDIS_PORT');
  const redisUser = configService.get<string>('REDIS_USER');
  const redisPass = configService.get<string>('REDIS_PASSWORD');
  const redisUrl = `redis://${redisUser}:${redisPass}@${redisHost}:${redisPort}`;

  const redisClient = new IORedis(redisUrl);

  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
        //logErrors: true,
        //disableTouch: true,
      }),
      name: configService.getOrThrow<string>('SESSION_NAME'),
      secret: configService.getOrThrow<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        domain: configService.getOrThrow<string>('SESSION_DOMAIN'),
        httpOnly:
          configService.getOrThrow<string>('SESSION_HTTP_ONLY') === 'true',
        secure: configService.getOrThrow('SESSION_SECURE') === 'true',
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        sameSite: 'lax',
      },
    }),
  );

  //app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    //origin: config.get<string>('ALLOWED_ORIGIN'),
    credentials: true,
  });

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(configService.getOrThrow<number>('APPLICATION_PORT'));
}
bootstrap();
