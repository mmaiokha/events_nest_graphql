import { IsString, Length } from "class-validator";

export class RegisterDto {
  @IsString()
  @Length(5, 25)
  username: string

  @IsString()
  @Length(5, 25)
  email: string

  @IsString()
  @Length(8)
  password: string

  @IsString()
  @Length(8)
  passwordConfirm: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string
}