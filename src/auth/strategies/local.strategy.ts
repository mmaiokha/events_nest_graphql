import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService
  ) {
    super();
  }

  async validate(username: string, password: string) {
    return await this.authService.validateUser(username, password)
  }
}