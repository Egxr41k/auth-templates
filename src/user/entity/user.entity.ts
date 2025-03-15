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
  createdAt: Date;

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date;

  @Field()
  @Property({ type: 'email', unique: true })
  email!: string;

  @Property({ type: 'text' })
  password!: string;
}
