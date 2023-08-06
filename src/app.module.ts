import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { EventsModule } from './events/events.module';
import { AttendeeModule } from './attendee/attendee.module';
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import ormConfig from "./config/orm/orm.config";
import ormProdConfig from "./config/orm/orm.prod.config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV === "production" ? ormProdConfig : ormConfig
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      // debug: true,
      playground: true
    }),
    EventsModule,
    AttendeeModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
