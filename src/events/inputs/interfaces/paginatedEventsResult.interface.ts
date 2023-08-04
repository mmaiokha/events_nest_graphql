import { IPaginationResult } from "../../../paginator/paginator";
import { Events } from "../../events.entity";

export interface PaginatedEventsResultInterface extends IPaginationResult<Events> {}