import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Events } from "../events/events.entity";

export enum AttendeesAnswersEnum {
  Accept=0,
  Maybe,
  Reject
}

@Entity('attendees')
export class Attendees {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({type: "enum", default: AttendeesAnswersEnum.Accept, enum: AttendeesAnswersEnum})
  answer: AttendeesAnswersEnum

  @ManyToOne(() => Events, (event) => event.attendees, {nullable: false})
  event: Events
}