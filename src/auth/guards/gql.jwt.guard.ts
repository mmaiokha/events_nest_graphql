import { JwtGuard } from "./jwt.guard";
import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export class GqlJwtGuard extends JwtGuard {
  getRequest(ctx: ExecutionContext) {
    const context = GqlExecutionContext.create(ctx)
    return context.getContext().req
  }
}