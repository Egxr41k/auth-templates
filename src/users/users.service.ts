import { MikroORM } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from './entity/user.enity';

@Injectable()
export class UsersService {
  constructor(private readonly orm: MikroORM) {}

  async findOne(username: string) {
    return await this.orm.em.findOne(User, { username });
  }
}
