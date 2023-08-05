import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { Attendees } from "../attendee.entity";
import { Events } from "../../events/events.entity";

import { CreateAttendeeDto } from "../inputs/createAttendee.dto";

@Injectable()
export class AttendeeEventsService {
  constructor(
    @InjectRepository(Attendees)
    private readonly attendeeRepository: Repository<Attendees>,
    @InjectRepository(Events)
    private readonly eventsRepository: Repository<Events>
  ) {
  }

  async getAllByEventId(eventId: number): Promise<Attendees[]> {
    return await this.attendeeRepository.find({ where: { eventId } });
  }

  async getOneByEventAndUserId(eventId: number, userId: number): Promise<Attendees | undefined> {
    return await this.attendeeRepository.findOneBy({
      userId, eventId
    })
  }

  async updateOrCreateOneByEventAntUserId(createAttendeeDto: CreateAttendeeDto, eventId: number, userId: number): Promise<Attendees> {
    const attendee = await this.getOneByEventAndUserId(eventId, userId) ?? new Attendees()
    Object.assign(attendee, createAttendeeDto)
    attendee.eventId = eventId
    attendee.userId = userId
    return await this.attendeeRepository.save(attendee)
  }

  async deleteOneByEventAntUserId(eventId: number, currentUserId: number): Promise<Attendees> {
    const attendee = await this.getOneByEventAndUserId(eventId, currentUserId)
    if (!attendee) {
      throw new HttpException("Attendee not found", HttpStatus.NOT_FOUND);
    }
    await this.attendeeRepository.delete({ id: attendee.id });
    return;
  }
}
