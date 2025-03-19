import { AuthGuard } from '@nestjs/passport';

import { applyDecorators, UseGuards } from '@nestjs/common';

export function Authentication() {
  return applyDecorators(UseGuards(AuthGuard('jwt')));
}
