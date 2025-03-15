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

  async findByEmail(email: string) {
    return await this.orm.em.findOne(User, { email });
  }

  async create(email: string, password: string) {
    const user = this.orm.em.create(User, {
      email,
      password: await hash(password),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    if (user) {
      await this.orm.em.persistAndFlush(user);
      return user;
    }
  }

  async validate(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.password, password);
    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }
}
