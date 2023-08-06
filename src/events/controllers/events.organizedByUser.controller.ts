import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { EventsService } from "../services/events.service";
import { PaginationQueryDto } from "../../paginator/paginationQuery.dto";

@Controller('events/organized-by/:userId')
export class EventsOrganizedByUserController {
  constructor(
    private readonly eventsService: EventsService
  ) {}

  @Get()
  async getAll(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() query: PaginationQueryDto
  ) {
    return await this.eventsService.getAllOrganizedByUser(userId, query)
  }

}