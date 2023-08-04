import { IsOptional } from "class-validator";

export class PaginationQueryDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  take?: number
}