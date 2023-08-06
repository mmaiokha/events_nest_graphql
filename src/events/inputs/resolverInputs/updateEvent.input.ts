import { InputType, PartialType } from "@nestjs/graphql";
import { CreateEventInput } from "./createEvent.input";

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {}