import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { EventsModule } from './events/events.module';
import { AttendeeModule } from './attendee/attendee.module';
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import ormConfig from "./config/orm/orm.config";
import ormProdConfig from "./config/orm/orm.prod.config";

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
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
