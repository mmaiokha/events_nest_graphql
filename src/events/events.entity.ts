import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attendees } from "../attendee/attendee.entity";

@Entity('events')
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
  attendees: Attendees[]

  attendeesCount?: number
  attendeesAcceptCount?: number
  attendeesMaybeCount?: number
  attendeesRejectCount?: number
}

