import { BadRequestException, Injectable } from '@nestjs/common';
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

  async register(email: string, password: string, req: Request) {
    const user = await this.userService.create(email, password);
    if (!user) throw new BadRequestException();
    if (user instanceof User) await this.sessionService.save(req, `${user.id}`);
    return { user };
  }

  async login(email: string, password: string, req: Request) {
    const user = await this.userService.validate(email, password);
    if (!user) throw new BadRequestException();
    await this.sessionService.save(req, `${user.id}`);
    return { user };
  }

  public async logout(req: Request, res: Response) {
    try {
      await this.sessionService.destroy(req);
      res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));
      return 'You have successfully logget out';
    } catch (err) {
      return err.message;
    }
  }
}
