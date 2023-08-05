import { AttendeesAnswersEnum } from "../attendee.entity";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateAttendeeDto {
  @IsEnum(AttendeesAnswersEnum)
  @IsNotEmpty()
  @IsOptional()
  answer: AttendeesAnswersEnum;
}