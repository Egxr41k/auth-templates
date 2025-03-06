import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';

dotenv.config(); // Загружаем переменные из .env

const config: Options<PostgreSqlDriver> = {
  debug: process.env.NODE_ENV === 'development',
  driver: PostgreSqlDriver,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DB,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  migrations: { path: 'src/mikro-orm/migrations' },
};

export default config;
