import { MikroORM } from '@mikro-orm/postgresql';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, verify } from 'argon2';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly orm: MikroORM) {}

  public async findById(id: number) {
    const user = await this.orm.em.findOne(User, { id });

    if (!user) {
      throw new NotFoundException(
        'Пользователь не найден. Пожалуйста, проверьте введенніе данные',
      );
    }

    return user;
  }

  async findByUsername(username: string) {
    return await this.orm.em.findOne(User, { username });
  }

  async create(username: string, password: string) {
    const user = await this.orm.em.create(User, {
      username,
      password: await hash(password),
    });
    if (user) {
      await this.orm.em.persistAndFlush(user);
      return user;
    }
  }

  async validate(username: string, password: string) {
    const user = await this.findByUsername(username);
    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.password, password);
    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }
}
