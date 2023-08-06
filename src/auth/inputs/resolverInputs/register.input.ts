import { IsString, Length } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RegisterInput {
  @Field()
  @IsString()
  @Length(5, 25)
  username: string

  @Field()
  @IsString()
  @Length(5, 25)
  email: string

  @Field()
  @IsString()
  @Length(8)
  password: string

  @Field()
  @IsString()
  @Length(8)
  passwordConfirm: string

  @Field()
  @IsString()
  firstName: string

  @Field()
  @IsString()
  lastName: string
}