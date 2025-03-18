import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(email: string, password: string) {
    const oldUser = await this.userService.findByEmail(email);

    if (oldUser) throw new BadRequestException('User already exists');

    const user = await this.userService.create(email, password);
    if (!user) throw new BadRequestException();

    const tokens = await this.issueTokens(user.id);

    return { user: user, ...tokens };
  }

  async login(email: string, password: string) {
    const user = await this.userService.validate(email, password);
    if (!user) throw new BadRequestException();

    const tokens = await this.issueTokens(user.id);

    return { user: user, ...tokens };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);

    if (result) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.userService.findById(result.id);

    const tokens = await this.issueTokens(user.id);

    return {
      user: user,
      ...tokens,
    };
  }

  private async issueTokens(userId: number) {
    const data = {
      id: userId,
    };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
