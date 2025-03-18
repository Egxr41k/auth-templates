import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

export function Authentication() {
  return applyDecorators(UseGuards(AuthGuard));
}
