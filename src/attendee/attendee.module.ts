import { Module } from '@nestjs/common';
import { AttendeeController } from './attendee.controller';
import { Attendees } from "./attendee.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsModule } from "../events/events.module";
import { AttendeeService } from "./attendee.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendees]),
    EventsModule
  ],
  controllers: [AttendeeController],
  providers: [AttendeeService]
})
export class AttendeeModule {}
