import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { SessionService } from './session.service';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService,
  ) {}

  async register(username: string, password: string, req: Request) {
    const user = await this.userService.create(password, username);
    if (!user)
      return {
        errors: [
          {
            field: '',
            message: 'registration was failed',
          },
        ],
      };

    if (user instanceof User) await this.sessionService.save(req, `${user.id}`);
    return { user };
  }

  async login(username: string, password: string, req: Request) {
    const user = await this.userService.validate(password, username);
    if (!user)
      return {
        errors: [
          {
            field: '',
            message: 'login was failed',
          },
        ],
      };
    await this.sessionService.save(req, `${user.id}`);

    return { user };
  }

  public async logout(req: Request, res: Response) {
    await this.sessionService.destroy(req);
    res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));

    return true;
  }
}
