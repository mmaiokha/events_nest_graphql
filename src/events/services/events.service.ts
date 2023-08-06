import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { DeleteResult, Repository } from "typeorm";
import { Events } from "../events.entity";

import { CreateEventDto } from "../inputs/dto/createEvent.dto";
import { UpdateEventDto } from "../inputs/dto/updateEvent.dto";
import { AttendeesAnswersEnum } from "../../attendee/attendee.entity";
import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";
import { FilterEventsDto, WhenEventFilter } from "../inputs/dto/filterEvents.dto";
import { PaginatedEventsResultInterface } from "../inputs/interfaces/paginatedEventsResult.interface";

import { paginate } from "../../paginator/paginator";
import { Users } from "../../users/users.entity";
import { PaginationQueryDto } from "../../paginator/paginationQuery.dto";


@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>
  ) {
  }

  addAttendeeCountToQb(qb: SelectQueryBuilder<Events>): SelectQueryBuilder<Events> {
    return qb.loadRelationCountAndMap("event.attendeesCount", "event.attendees")
      .loadRelationCountAndMap("event.attendeesAcceptCount", "event.attendees", "attendee",
        (qb) => qb.where("attendee.answer = :answer", { answer: AttendeesAnswersEnum.Accept })
      )
      .loadRelationCountAndMap("event.attendeesMaybeCount", "event.attendees", "attendee",
        (qb) => qb.where("attendee.answer = :answer", { answer: AttendeesAnswersEnum.Maybe })
      )
      .loadRelationCountAndMap("event.attendeesRejectCount", "event.attendees", "attendee",
        (qb) => qb.where("attendee.answer = :answer", { answer: AttendeesAnswersEnum.Reject })
      );
  }

  async getOneWithAttendeeAnswer(id: number): Promise<Events> {
    const queryBuilder = this.addAttendeeCountToQb(this.eventRepository.createQueryBuilder("event")
      .andWhere("event.id = :id", { id }));
    return await queryBuilder.getOne();
  }

  async getAllWithAttendeeAnswer(query?: FilterEventsDto): Promise<PaginatedEventsResultInterface> {
    const queryBuilder = this.addAttendeeCountToQb(this.eventRepository.createQueryBuilder("event"));
    const page = query.page || 1;
    const take: number = query.take || 10;
    const skip: number = (page - 1) * take;

    if (!query) {
      return await paginate({ take, skip }, PaginatedEventsResultInterface, queryBuilder);
    }

    if (query.when) {
      if (query.when == WhenEventFilter.Today) {
        queryBuilder.andWhere(
          `event.when >= CURRENT_DATE and event.when <= CURRENT_DATE + 1`
        );
      }
      if (query.when == WhenEventFilter.Tomorrow) {
        queryBuilder.andWhere(
          "event.when >= CURRENT_DATE+1 and event.when <= CURRENT_DATE+2"
        );
      }
      if (query.when == WhenEventFilter.ThisWeek) {
        queryBuilder.andWhere(
          "date_part('week', event.when) = date_part('week', CURRENT_DATE)"
        );
      }
      if (query.when == WhenEventFilter.NextWeek) {
        queryBuilder.andWhere(`date_part('week', event.when) = date_part('week', CURRENT_DATE) + 1`);
      }

    }

    console.log(await paginate<Events, PaginatedEventsResultInterface>({
      take,
      skip
    }, PaginatedEventsResultInterface, queryBuilder));
    return await paginate<Events, PaginatedEventsResultInterface>({
      take,
      skip
    }, PaginatedEventsResultInterface, queryBuilder);
  }

  async createOne(data: CreateEventDto, currentUser: Users): Promise<Events> {
    const event = new Events();
    Object.assign(event, {
      ...data,
      organizer: currentUser,
      when: new Date(data.when)
    });
    return await this.eventRepository.save(event);
  }

  async getOne(id: number): Promise<Events> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ["organizer"]
    });
    if (!event) {
      throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
    }
    return event;
  }

  async updateOne(id: number, data: UpdateEventDto, currentUserId: number): Promise<Events> {
    const event = await this.eventRepository.findOne({ where: { id }, relations: ["organizer"] });
    if (!event) {
      throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
    }
    if (event.organizerId !== currentUserId) {
      throw new HttpException("You are not an organizer", HttpStatus.BAD_REQUEST);
    }
    Object.assign(event, data);

    return await this.eventRepository.save(event);
  }

  async deleteOne(id: number, currentUserId: number): Promise<DeleteResult> {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) {
      throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
    }
    if (event.organizerId !== currentUserId) {
      throw new HttpException("You are not an organizer", HttpStatus.BAD_REQUEST);
    }
    return await this.eventRepository.delete({ id });
  }

  async getAll(query?: FilterEventsDto): Promise<PaginatedEventsResultInterface> {
    const page = query.page || 1;
    const take: number = query.take || 10;
    const skip: number = (page - 1) * take;
    return await paginate({
      take,
      skip
    }, PaginatedEventsResultInterface, this.eventRepository.createQueryBuilder("event"));
  }

  async getAllOrganizedByUser(userId: number, paginationQuery: PaginationQueryDto): Promise<PaginatedEventsResultInterface> {
    const page = paginationQuery.page || 1;
    const take: number = paginationQuery.take || 10;
    const skip: number = (page - 1) * take;
    const qb = this.addAttendeeCountToQb(this.eventRepository.createQueryBuilder("event")
      .andWhere("event.organizerId = :userId", { userId }));
    return await paginate({ take, skip }, PaginatedEventsResultInterface, qb);
  }

  async getEventsAttendedByUserId(currentPage: number, userId: number) {
    const page = currentPage || 1;
    const take: number = 10;
    const skip: number = (page - 1) * take;

    const qb = this.eventRepository.createQueryBuilder("event")
      .leftJoin("event.attendees", "attendees")
      .where("attendees.userId = :userId", { userId });


    return paginate<Events, PaginatedEventsResultInterface>({
      take,
      skip
    }, PaginatedEventsResultInterface, await this.addAttendeeCountToQb(qb));
  }
}
