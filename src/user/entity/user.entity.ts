import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt;

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt;

  @Field()
  @Property({ type: 'text', unique: true })
  username!: string;

  @Property({ type: 'text' })
  password!: string;
}
