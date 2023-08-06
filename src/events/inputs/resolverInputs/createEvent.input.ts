import { CreateEventDto } from "../dto/createEvent.dto";
import { InputType } from "@nestjs/graphql";

@InputType()
export class CreateEventInput extends CreateEventDto {}