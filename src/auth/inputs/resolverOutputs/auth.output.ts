import { Field, ObjectType } from "@nestjs/graphql";
import { Users } from "../../../users/users.entity";

@ObjectType()
class UserOutput {
  @Field()
  username: string

  @Field()
  password: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field({nullable: true})
  email?: string
}

@ObjectType()
export class AuthOutput {
  constructor(partial?: Partial<AuthOutput>) {
    Object.assign(this, partial);
  }

  @Field()
  token: string;

  @Field()
  user: Users
}