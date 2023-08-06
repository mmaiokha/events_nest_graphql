import { forwardRef, Module } from "@nestjs/common";
import { EventsService } from "./services/events.service";
import { EventsController } from "./controllers/events.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Events } from "./events.entity";
import { EventsAttendeesController } from "./controllers/events.attendees.controller";
import { AttendeeModule } from "../attendee/attendee.module";
import { EventsOrganizedByUserController } from "./controllers/events.organizedByUser.controller";
import { EventsResolver } from "./events.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([Events]),
    forwardRef(() => AttendeeModule)
  ],
  providers: [EventsService, EventsResolver],
  controllers: [EventsController, EventsAttendeesController, EventsOrganizedByUserController],
  exports: [TypeOrmModule, EventsService]
})
export class EventsModule {
}
