import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";

import { AttendeeService } from "./attendee.service";

import { CreateAttendeeDto } from "./inputs/createAttendee.dto";
import { UpdateAttendeeDto } from "./inputs/updateAttendee.dto";

@Controller("attendee")
export class AttendeeController {
  constructor(
    private readonly attendeeService: AttendeeService
  ) {
  }

  @Post()
  async createOne(@Body() createAttendeeDto: CreateAttendeeDto) {
    return await this.attendeeService.createOne(createAttendeeDto);
  }

  @Get()
  async getAll() {
    return await this.attendeeService.getAll();
  }

  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number) {
    return await this.attendeeService.getOne(Number(id));
  }

  @Patch(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() updateAttendeeDto: UpdateAttendeeDto) {
    return await this.attendeeService.updateOne(Number(id), updateAttendeeDto);
  }

  @Delete(":id")
  async deleteOne(@Param("id", ParseIntPipe) id: number) {
    return await this.attendeeService.deleteOne(Number(id));
  }
}
