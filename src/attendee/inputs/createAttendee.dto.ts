import { AttendeesAnswersEnum } from "../attendee.entity";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAttendeeDto {
  @IsString()
  name: string;

  @IsEnum(AttendeesAnswersEnum)
  @IsNotEmpty()
  @IsOptional()
  answer?: AttendeesAnswersEnum;

  @IsNumber()
  eventId: number;
}