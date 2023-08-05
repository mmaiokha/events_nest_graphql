import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../../auth/decorators/currentUser.decorator";
import { JwtGuard } from "../../auth/guards/jwt.guard";
import { Users } from "../../users/users.entity";
import { CreateAttendeeDto } from "../../attendee/inputs/createAttendee.dto";
import { AttendeeEventsService } from "../../attendee/services/attendee.events.service";

@Controller("events/:eventId/attendees")
export class EventsAttendeesController {
  constructor(
    private readonly attendeeEventsService: AttendeeEventsService
  ) {
  }

  @Get()
  async getAllAttendees(@Param("eventId", ParseIntPipe) eventId: number) {
    return await this.attendeeEventsService.getAllByEventId(eventId);
  }

  @UseGuards(JwtGuard)
  @Post()
  async createOrUpdateOneAttendee(
    @Param("eventId", ParseIntPipe) eventId: number,
    @CurrentUser() currentUser: Users,
    @Body() createAttendeeDto: CreateAttendeeDto
  ) {
    return await this.attendeeEventsService.updateOrCreateOneByEventAntUserId(
      createAttendeeDto, eventId, currentUser.id
    );
  }

  @UseGuards(JwtGuard)
  @Delete()
  async deleteOneAttendee(
    @Param("eventId") eventId: number,
    @CurrentUser() currentUser: Users
  ) {
    return await this.attendeeEventsService.deleteOneByEventAntUserId(eventId, currentUser.id);
  }
}