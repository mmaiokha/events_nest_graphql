import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Repository } from "typeorm";
import { Users } from "../../users/users.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET
    });
  }

  async validate(payload: any) {
    return await this.usersRepository.findOneBy({id: payload.id})
  }
}