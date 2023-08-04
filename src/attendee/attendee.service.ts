import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { Attendees } from "./attendee.entity";
import { Events } from "../events/events.entity";

import { CreateAttendeeDto } from "./inputs/createAttendee.dto";
import { UpdateAttendeeDto } from "./inputs/updateAttendee.dto";

@Injectable()
export class AttendeeService {
  constructor(
    @InjectRepository(Attendees)
    private readonly attendeeRepository: Repository<Attendees>,
    @InjectRepository(Events)
    private readonly eventsRepository: Repository<Events>
  ) {
  }

  async createOne(data: CreateAttendeeDto): Promise<Attendees> {
    const attendee = new Attendees();
    Object.assign(attendee, {
      ...data
    });
    const event = await this.eventsRepository.findOneBy({ id: data.eventId });
    if (!event) {
      throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
    }
    attendee.event = event;
    return await this.attendeeRepository.save(attendee);
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

  async updateOne(id: number, data: UpdateAttendeeDto): Promise<Attendees> {
    const attendee = await this.attendeeRepository.findOneBy({ id });
    if (!attendee) {
      throw new HttpException("Attendee not found", HttpStatus.NOT_FOUND);
    }
    Object.assign(attendee, data);

    return await this.attendeeRepository.save(attendee);
  }

  async deleteOne(id: number): Promise<Attendees> {
    if (!await this.attendeeRepository.findOneBy({ id })) {
      throw new HttpException("Attendee not found", HttpStatus.NOT_FOUND);
    }
    await this.attendeeRepository.delete({ id });
    return;
  }

  async getAll(): Promise<Attendees[]> {
    return await this.attendeeRepository.find();
  }
}
