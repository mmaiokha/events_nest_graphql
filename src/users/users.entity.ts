import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Events } from "../events/events.entity";
import { Attendees } from "../attendee/attendee.entity";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Events, (event) => event.organizer)
  organized: Events[];

  @OneToMany(() => Attendees, (attendee) => attendee.user)
  attended: Attendees[]
}