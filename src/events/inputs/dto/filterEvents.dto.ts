import { PartialType } from "@nestjs/mapped-types";
import { PaginationQueryDto } from "../../../paginator/paginationQuery.dto";

export class FilterEventsDto extends PartialType(PaginationQueryDto){
  when?: WhenEventFilter;
}

export enum WhenEventFilter {
  All=0,
  Today,
  Tomorrow,
  ThisWeek,
  NextWeek
}