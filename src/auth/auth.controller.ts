import { Body, Request, Controller, Post, UseGuards, Get } from "@nestjs/common";
import { RegisterDto } from "./inputs/dto/register.dto";
import { AuthService } from "./auth.service";
import { LocalGuard } from "./guards/local.guard";
import { LoginDto } from "./inputs/dto/login.dto";
import { JwtGuard } from "./guards/jwt.guard";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto)
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req) {
    return await this.authService.login(req.user)
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async getCurrentUser(@Request() req) {
    return await this.authService.getCurrentUser(req.user.id)
  }
}
