import {
  Controller,
  Get,
  Param,
  ParseIntPipe
} from "@nestjs/common";

import { AttendeeService } from "./services/attendee.service";


@Controller("attendee")
export class AttendeeController {
  constructor(
    private readonly attendeeService: AttendeeService
  ) {
  }

  @Get()
  async getAll() {
    return await this.attendeeService.getAll();
  }

  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number) {
    return await this.attendeeService.getOne(Number(id));
  }
}
