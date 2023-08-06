import { InputType, PartialType } from "@nestjs/graphql";
import { PaginationQueryDto } from "../../paginator/paginationQuery.dto";

@InputType()
export class PaginateInput extends PartialType(PaginationQueryDto){}