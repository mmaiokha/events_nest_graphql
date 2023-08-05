import { HttpException, HttpStatus, Injectable, UseGuards } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { Attendees } from "../attendee.entity";
import { Events } from "../../events/events.entity";
import { JwtGuard } from "../../auth/guards/jwt.guard";

@Injectable()
export class AttendeeService {
  constructor(
    @InjectRepository(Attendees)
    private readonly attendeeRepository: Repository<Attendees>,
    @InjectRepository(Events)
    private readonly eventsRepository: Repository<Events>
  ) {
  }

  async getOne(id: number): Promise<Attendees> {
    const attendee = await this.attendeeRepository.findOne({
      where: { id },
      relations: ["event"]
    });
    if (!attendee) {
      throw new HttpException("Attendee not found", HttpStatus.NOT_FOUND);
    }
    return attendee;
  }

  async getAll(): Promise<Attendees[]> {
    return await this.attendeeRepository.find();
  }


}
