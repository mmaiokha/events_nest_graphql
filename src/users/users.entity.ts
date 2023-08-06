import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Events } from "../events/events.entity";
import { Attendees } from "../attendee/attendee.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Users {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column()
  password: string;

  @Field({nullable: true})
  @Column({ unique: true })
  email: string;

  @Field({nullable: true})
  @Column()
  firstName: string;

  @Field({nullable: true})
  @Column()
  lastName: string;

  @Field(() => [Events], {nullable: true})
  @OneToMany(() => Events, (event) => event.organizer)
  organized: Events[];

  @Field(() => [Attendees], {nullable: true})
  @OneToMany(() => Attendees, (attendee) => attendee.user)
  attended: Attendees[]
}