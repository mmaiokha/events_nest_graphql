import { IsDateString, IsString, Length } from "class-validator";

export class CreateEventDto {
  @IsString()
  @Length(5, 55)
  name: string;

  @IsString()
  @Length(55, 1000)
  description: string;

  @IsString()
  @Length(5, 55)
  address: string;

  @IsDateString()
  when: string;
}