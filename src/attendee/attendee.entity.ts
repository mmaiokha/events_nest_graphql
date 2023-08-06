import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Events } from "../events/events.entity";
import { Users } from "../users/users.entity";
import { Field, ObjectType } from "@nestjs/graphql";

export enum AttendeesAnswersEnum {
  Accept=0,
  Maybe,
  Reject
}

@ObjectType()
@Entity('attendees')
export class Attendees {

  @Field({nullable: true})
  @PrimaryGeneratedColumn()
  id: number

  @Field({nullable: true})
  @Column({type: "enum", default: AttendeesAnswersEnum.Accept, enum: AttendeesAnswersEnum})
  answer: AttendeesAnswersEnum

  @Field(() => Events, {nullable: true})
  @ManyToOne(() => Events, (event) => event.attendees, {nullable: false, onDelete: 'CASCADE'})
  event: Events

  @Field({nullable: true})
  @Column()
  eventId: number

  @Field(() => Users, {nullable: true})
  @ManyToOne(() => Users, (user) => user.attended, {onDelete: 'CASCADE'})
  user: Users

  @Field({nullable: true})
  @Column()
  userId: number
}