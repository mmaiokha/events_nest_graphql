import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateAttendeeDto } from "./createAttendee.dto";

export class UpdateAttendeeDto extends PartialType(OmitType(CreateAttendeeDto, ['eventId'])) {}