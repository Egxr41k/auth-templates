import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { User } from 'src/user/entity/user.entity';

// export const CurrentUser = createParamDecorator(
//   (data: keyof User, context: ExecutionContext) => {
//     const request = GqlExecutionContext.create(context)
//       .switchToHttp()
//       .getRequest();
//     const user = request.user;
//     return data ? user[data] : user;
//   },
// );
