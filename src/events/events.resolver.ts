import { Resolver, Query } from "@nestjs/graphql";
import { EventsService } from "./services/events.service";
import { UseGuards } from "@nestjs/common";
import { GqlJwtGuard } from "../auth/guards/gql.jwt.guard";


@Resolver()
export class EventsResolver {
  constructor(
    private readonly eventsService: EventsService
  ) {
  }

  @UseGuards(GqlJwtGuard)
  @Query(() => String)
  async authResolver(): Promise<string> {
    return 'auth protected'
  }
}