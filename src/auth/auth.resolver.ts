import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginInput } from "./inputs/resolverInputs/login.input";
import { AuthOutput } from "./inputs/resolverOutputs/auth.output";
import { Users } from "../users/users.entity";
import { CurrentUser } from "./decorators/currentUser.decorator";
import { UseGuards } from "@nestjs/common";
import { GqlJwtGuard } from "./guards/gql.jwt.guard";
import { RegisterInput } from "./inputs/resolverInputs/register.input";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService
  ) {
  }

  @UseGuards(GqlJwtGuard)
  @Query(() => Users, {name: 'me'})
  async me(@CurrentUser() user: Users): Promise<Users> {
    return user;
  }

  @Mutation(() => AuthOutput, {name: 'login'})
  public async login(
    @Args("input", { type: () => LoginInput }) input: LoginInput
  ): Promise<AuthOutput> {
    return this.authService.generateAuthResponse(await this.authService.validateUser(input.username, input.password))
  }

  @Mutation(() => AuthOutput, {name: 'register'})
  public async register(
    @Args("input", { type: () => RegisterInput }) input: RegisterInput
  ): Promise<AuthOutput> {
    return await this.authService.register(input)
  }
}
