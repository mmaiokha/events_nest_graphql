import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";

import { EventsService } from "../services/events.service";

import { CreateEventDto } from "../inputs/dto/createEvent.dto";
import { UpdateEventDto } from "../inputs/dto/updateEvent.dto";
import { Events } from "../events.entity";
import { DeleteResult } from "typeorm";
import { FilterEventsDto } from "../inputs/dto/filterEvents.dto";
import { PaginatedEventsResultInterface } from "../inputs/interfaces/paginatedEventsResult.interface";
import { JwtGuard } from "../../auth/guards/jwt.guard";
import { CurrentUser } from "../../auth/decorators/currentUser.decorator";
import { Users } from "../../users/users.entity";


@Controller("events")
export class EventsController {
  constructor(
    private readonly eventsService: EventsService
  ) {
  }

  @UseGuards(JwtGuard)
  @Post()
  async createOne(
    @Body() createEventDto: CreateEventDto,
    @CurrentUser() currentUser: Users
  ): Promise<Events> {
    return await this.eventsService.createOne(createEventDto, currentUser);
  }

  @Get()
  async getAll(@Query() query: FilterEventsDto): Promise<PaginatedEventsResultInterface> {
    return await this.eventsService.getAll(query);
  }

  @Get("with-answer")
  async getAllWithAttendeeAnswer(@Query() query?: FilterEventsDto): Promise<PaginatedEventsResultInterface> {
    return await this.eventsService.getAllWithAttendeeAnswer(query);
  }

  @UseGuards(JwtGuard)
  @Get("attended-by-me")
  async getAllAttendedByCurrentUser(
    @CurrentUser() currentUser: Users,
    @Query("page", ParseIntPipe) page: number = 1
  ) {
    return await this.eventsService.getEventsAttendedByUserId(page, currentUser.id);
  }

  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<Events> {
    return await this.eventsService.getOne(Number(id));
  }

  @UseGuards(JwtGuard)
  @Patch(":id")
  async updateOne(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
    @CurrentUser() currentUser: Users
  ): Promise<Events> {
    return await this.eventsService.updateOne(Number(id), updateEventDto, currentUser.id);
  }

  @UseGuards(JwtGuard)
  @Delete(":id")
  async deleteOne(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser() currentUser: Users
  ): Promise<DeleteResult> {
    return await this.eventsService.deleteOne(Number(id), currentUser.id);
  }

  @Get(":id/with-answer")
  async getOneWithAttendeeAnswer(@Param("id", ParseIntPipe) id: number) {
    return await this.eventsService.getOneWithAttendeeAnswer(id);
  }
}


