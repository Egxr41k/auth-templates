import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/entity/user.entity';

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;
}
