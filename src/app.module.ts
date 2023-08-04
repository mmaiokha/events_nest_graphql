import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { EventsModule } from './events/events.module';
import { AttendeeModule } from './attendee/attendee.module';
import { ConfigModule } from "@nestjs/config";

import ormConfig from "./config/orm.config";
import ormProdConfig from "./config/orm.prod.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV === "production" ? ormProdConfig : ormConfig
    }),
    EventsModule,
    AttendeeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
