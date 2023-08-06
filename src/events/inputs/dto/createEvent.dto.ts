import { IsDateString, IsString, Length } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateEventDto {
  @Field()
  @IsString()
  @Length(5, 55)
  name: string;

  @Field()
  @IsString()
  @Length(55, 1000)
  description: string;

  @Field()
  @IsString()
  @Length(5, 55)
  address: string;

  @Field()
  @IsDateString()
  when: string;
}