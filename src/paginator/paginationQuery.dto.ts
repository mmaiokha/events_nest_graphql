import { IsOptional } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PaginationQueryDto {
  @Field({nullable: true})
  @IsOptional()
  page?: number;

  @Field({nullable: true})
  @IsOptional()
  take?: number
}