import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthResolver } from "./auth.resolver";

@Module({
  providers: [AuthService, JwtStrategy, LocalStrategy, AuthResolver],
  controllers: [AuthController],
  imports: [JwtModule.register({
    signOptions: {
      expiresIn: '60m'
    }
  }), UsersModule]
})
export class AuthModule {}
