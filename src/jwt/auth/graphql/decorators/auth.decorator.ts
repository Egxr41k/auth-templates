import { applyDecorators, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/auth.guard';

export function Authentication() {
  return applyDecorators(UseGuards(GqlAuthGuard));
}
