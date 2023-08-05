import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attendees } from "../attendee/attendee.entity";
import { Users } from "../users/users.entity";

@Entity("events")
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  when: Date;

  @OneToMany(() => Attendees, (attendee) => attendee.event)
  attendees: Attendees[];

  @ManyToOne(() => Users, (user) => user.organized, { nullable: false, onDelete: "RESTRICT"})
  organizer: Users;

  @Column({ nullable: true })
  organizerId: number;

  attendeesCount?: number;
  attendeesAcceptCount?: number;
  attendeesMaybeCount?: number;
  attendeesRejectCount?: number;
}

