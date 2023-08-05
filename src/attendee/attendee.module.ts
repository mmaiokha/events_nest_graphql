import { forwardRef, Module } from "@nestjs/common";
import { AttendeeController } from './attendee.controller';
import { Attendees } from "./attendee.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsModule } from "../events/events.module";
import { AttendeeService } from "./services/attendee.service";
import { AttendeeEventsService } from "./services/attendee.events.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendees]),
    forwardRef(() => EventsModule)
  ],
  controllers: [AttendeeController],
  providers: [AttendeeService, AttendeeEventsService],
  exports: [AttendeeService, AttendeeEventsService]
})
export class AttendeeModule {}
