import {
  Resolver,
  Query,
  Args,
  Int, Mutation
} from "@nestjs/graphql";
import { EventsService } from "../services/events.service";
import { UseGuards } from "@nestjs/common";
import { GqlJwtGuard } from "../../auth/guards/gql.jwt.guard";
import { Events } from "../events.entity";
import { CurrentUser } from "../../auth/decorators/currentUser.decorator";
import { Users } from "../../users/users.entity";
import { CreateEventInput } from "../inputs/resolverInputs/createEvent.input";
import { UpdateEventInput } from "../inputs/resolverInputs/updateEvent.input";
import { DeleteOutput } from "../../genericTypes/output/delete.output";
import { PaginatedEventsResultInterface } from "../inputs/interfaces/paginatedEventsResult.interface";
import { PaginateInput } from "../../genericTypes/input/paginate.input";


@Resolver()
export class EventsResolver {
  constructor(
    private readonly eventsService: EventsService
  ) {
  }

  @Query(() => Events, { name: "getOneEvent" })
  async getOne(@Args("id", { type: () => Int }) id: number): Promise<Events> {
    return await this.eventsService.getOne(id);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => Events, { name: "createOneEvent" })
  async createOne(
    @CurrentUser() currentUser: Users,
    @Args("input") input: CreateEventInput
  ): Promise<Events> {
    return await this.eventsService.createOne(input, currentUser);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => Events, { name: "updateOneEvent" })
  async updateOne(
    @CurrentUser() currentUser: Users,
    @Args("id", { type: () => Int }) id: number,
    @Args("input") input: UpdateEventInput
  ): Promise<Events> {
    return await this.eventsService.updateOne(id, input, currentUser.id);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => Events, { name: "deleteOneEvent" })
  async deleteOne(
    @CurrentUser() currentUser: Users,
    @Args("id", { type: () => Int }) id: number
  ): Promise<DeleteOutput> {
    await this.eventsService.deleteOne(id, currentUser.id);
    return { id };
  }

  @Query(() => PaginatedEventsResultInterface, { name: "getAllEvents" })
  async getAll(
    @Args("paginate") paginate: PaginateInput
  ): Promise<PaginatedEventsResultInterface> {
    return await this.eventsService.getAllWithAttendeeAnswer(paginate);
  }

  @Query(() => PaginatedEventsResultInterface, { name: "getAllEventsOrganizedByUser" })
  async getAllOrganizedByUser(
    @Args("userId", { type: () => Int }) userId: number,
    @Args("paginate") paginate: PaginateInput
  ): Promise<PaginatedEventsResultInterface> {
    return await this.eventsService.getAllOrganizedByUser(userId, paginate);
  }
}