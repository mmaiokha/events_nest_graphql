import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { EventsService } from "../services/events.service";

@Controller('events/organized-by/:userId')
export class EventsOrganizedByUserController {
  constructor(
    private readonly eventsService: EventsService
  ) {}

  @Get()
  async getAll(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('page') page: number = 1
  ) {
    return await this.eventsService.getAllOrganizedByUser(userId, page)
  }

}