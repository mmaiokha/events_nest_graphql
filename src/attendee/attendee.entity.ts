import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Events } from "../events/events.entity";
import { Users } from "../users/users.entity";

export enum AttendeesAnswersEnum {
  Accept=0,
  Maybe,
  Reject
}

@Entity('attendees')
export class Attendees {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: "enum", default: AttendeesAnswersEnum.Accept, enum: AttendeesAnswersEnum})
  answer: AttendeesAnswersEnum

  @ManyToOne(() => Events, (event) => event.attendees, {nullable: false, onDelete: 'CASCADE'})
  event: Events

  @Column()
  eventId: number

  @ManyToOne(() => Users, (user) => user.attended, {onDelete: 'CASCADE'})
  user: Users

  @Column()
  userId: number
}