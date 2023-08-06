import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attendees } from "../attendee/attendee.entity";
import { Users } from "../users/users.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity("events")
export class Events {
  @Field({nullable: true})
  @PrimaryGeneratedColumn()
  id: number;

  @Field({nullable: true})
  @Column()
  name: string;

  @Field({nullable: true})
  @Column()
  description: string;

  @Field({nullable: true})
  @Column()
  address: string;

  @Field({nullable: true})
  @Column()
  when: Date;

  @Field(() => [Attendees], {nullable: true})
  @OneToMany(() => Attendees, (attendee) => attendee.event)
  attendees: Attendees[];


  @ManyToOne(() => Users, (user) => user.organized, { nullable: false, onDelete: "RESTRICT"})
  @Field(() => Users, {nullable: true})
  organizer: Users;

  @Field({nullable: true})
  @Column({ nullable: true })
  organizerId: number;

  @Field({nullable: true})
  attendeesCount?: number;

  @Field({nullable: true})
  attendeesAcceptCount?: number;

  @Field({nullable: true})
  attendeesMaybeCount?: number;

  @Field({nullable: true})
  attendeesRejectCount?: number;
}

