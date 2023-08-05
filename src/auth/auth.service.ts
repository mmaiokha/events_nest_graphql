import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Users } from "../users/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./inputs/dto/register.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly jwtService: JwtService
  ) {
  }

  generateAuthResponse(user: Users) {
    delete user.password;
    return {
      user,
      token: this.jwtService.sign({ id: user.id, username: user.username }, { secret: process.env.JWT_ACCESS_SECRET })
    };
  }

  async validateUser(username, password) {
    const user = await this.usersRepository.findOneBy({ username });
    if (user) {
      const comparePasswords = await bcrypt.compare(password, user.password);
      if (comparePasswords) {
        return user;
      }
    }
    return null;
  }

  async register(registerDto: RegisterDto) {
    if (registerDto.password !== registerDto.passwordConfirm) {
      throw new HttpException("Password are not identical", HttpStatus.BAD_REQUEST);
    }

    const userExist = await this.usersRepository.findOneBy([
      { username: registerDto.username },
      { email: registerDto.email }
    ]);
    if (userExist) {
      throw new HttpException("User is already exist", HttpStatus.BAD_REQUEST);
    }

    delete registerDto.passwordConfirm;
    const user = new Users();
    Object.assign(user, registerDto);
    user.password = await bcrypt.hash(registerDto.password, Number(process.env.BCRYPT_SALT));
    return this.generateAuthResponse(await this.usersRepository.save(user));
  }

  async login(user: Users) {
    return this.generateAuthResponse(user)
  }

  async getCurrentUser(id: number) {
    const user = await this.usersRepository.findOneBy({id})
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return this.generateAuthResponse(user)
  }
}
