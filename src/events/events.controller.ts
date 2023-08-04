import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";

import { EventsService } from "./events.service";

import { CreateEventDto } from "./inputs/dto/createEvent.dto";
import { UpdateEventDto } from "./inputs/dto/updateEvent.dto";
import { Events } from "./events.entity";
import { DeleteResult } from "typeorm";
import { FilterEventsDto } from "./inputs/dto/filterEvents.dto";
import { PaginatedEventsResultInterface } from "./inputs/interfaces/paginatedEventsResult.interface";


@Controller("events")
export class EventsController {
  constructor(
    private readonly eventsService: EventsService
  ) {
  }

  @Post()
  async createOne(@Body() createEventDto: CreateEventDto): Promise<Events> {
    return await this.eventsService.createOne(createEventDto);
  }

  @Get()
  async getAll(@Query() query: FilterEventsDto): Promise<PaginatedEventsResultInterface> {
    return await this.eventsService.getAll(query);
  }

  @Get("with-answer")
  async getAllWithAttendeeAnswer(@Query() query?: FilterEventsDto): Promise<PaginatedEventsResultInterface> {
    return await this.eventsService.getAllWithAttendeeAnswer(query);
  }

  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<Events> {
    return await this.eventsService.getOne(Number(id));
  }

  @Patch(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() updateEventDto: UpdateEventDto): Promise<Events> {
    return await this.eventsService.updateOne(Number(id), updateEventDto);
  }

  @Delete(":id")
  async deleteOne(@Param("id", ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.eventsService.deleteOne(Number(id));
  }

  @Get(":id/with-answer")
  async getOneWithAttendeeAnswer(@Param("id", ParseIntPipe) id: number) {
    return await this.eventsService.getOneWithAttendeeAnswer(id);
  }
}


