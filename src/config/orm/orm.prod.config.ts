import { Events } from "../../events/events.entity";
import { Attendees } from "../../attendee/attendee.entity";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { registerAs } from "@nestjs/config";


export default registerAs('orm.prod.config', (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Events, Attendees],
  synchronize: false
}))