import { PaginatedResult } from "../../../paginator/paginator";
import { Events } from "../../events.entity";
import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PaginatedEventsResultInterface extends PaginatedResult(Events) {}